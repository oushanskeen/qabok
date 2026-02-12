**Goal:** Teach clean, versioned, evolvable API design.

**Design and Produce**:
- Simple service with:
	- `POST /users` (R1)
	- `GET /users/{id}` (R2)
	- `PATCH /users/{id}` (R3)
	- `GET /health` (R4)
- Request/response schemas (R5)
- Error model (4xx vs 5xx) (R6)
-  Versioning strategy (`v1`, `v2-beta`) (R7)
**Constraints**:
- Must support **idempotency keys**  (R8)
- Must define **rate-limit behavior**  (R9)
- Must propose **pagination** for `GET /users`  (R10)
 **SDET specific**:
- Endpoints misuse  (R11)
- Testability hooks  (R12)
- Contracts for backward compatibility (R13)
- “…and this is how I’d test it with scale.”  (R14)

Requirements matrix:
_Run this Scenario Outline in your Cucumber framework._

```gherkin
Feature: API Design Fundamentals requirements matrix test

  Scenario Outline: API scenario driven by test matrix
    Given test tests "<Scenario Name>"
    And covers "<Requirement(s) Covered>"
    And test category is "<Validation Category>"
    And API version is "<Version>"
    When input is "<Client Payload / Setup>"
    And endpoint is "<Server Endpoint>"
    And request is "<Req(example)>"
    Then response is "Res(Example)"
    And code is "<Code>"
```

| Scenario Name                                | Requirement(s) Covered | Validation Category      | Version | Client Payload / Setup                         | Server Endpoint     | Req (example)                               | Res (example)                                                                  | Code |
| -------------------------------------------- | ---------------------- | ------------------------ | ------- | ---------------------------------------------- | ------------------- | ------------------------------------------- | ------------------------------------------------------------------------------ | ---- |
| Create user success                          | R1, R5                 | happy path               | v1      | Valid user                                     | POST /users         | `{ "name": "Alice", "email": "a@b.com" }`   | `{ "id": "uuid-123", "name": "Alice", "email": "a@b.com", "createdAt":"..." }` | 201  |
| Create user missing email                    | R1, R5, R6, R11        | misuse                   | v1      | Missing email                                  | POST /users         | `{ "name": "Alice" }`                       | `{ "type":"invalid-parameter","field":"email","message":"required" }`          | 400  |
| Create duplicate user                        | R1, R6, R11            | misuse                   | v1      | Already existing email                         | POST /users         | `{ "name": "Alice", "email": "a@b.com" }`   | `{ "type":"conflict","message":"user already exists" }`                        | 409  |
| Retry POST with same idempotency key         | R1, R8                 | idempotency keys         | v1      | Payload + `Idempotency-Key: abc-123`           | POST /users         | `{ "name": "Bob", "email": "b@b.com" }`     | `{ "id":"uuid-456", "name":"Bob", "email":"b@b.com" }`                         | 201  |
| Retry POST with different payload + same key | R1, R6, R8             | idempotency keys         | v1      | `Idempotency-Key: abc-123` + different payload | POST /users         | `{ "name": "Bob2", "email": "b2@b.com" }`   | `{ "type":"idempotency-key-conflict","message":"payload mismatch" }`           | 422  |
| Exceed rate limit                            | R1, R6, R9             | rate-limit behavior      | v1      | 100 requests in 1 sec                          | POST /users         | `{ "name": "Charlie", "email": "c@b.com" }` | `{ "type":"rate-limit-exceeded","retryAfter":5 }`                              | 429  |
| Pagination page 2, 10 per page               | R1, R5, R10            | pagination               | v1      | Query params `?page=2&pageSize=10`             | GET /users          | `?page=2&pageSize=10`                       | `[ {user1}, {user2}, ...]`                                                     | 200  |
| Pagination invalid page size                 | R1, R6, R10, R11       | misuse                   | v1      | Query `pageSize=-1`                            | GET /users          | `?page=1&pageSize=-1`                       | `{ "type":"invalid-parameter","field":"pageSize" }`                            | 400  |
| Get user success                             | R2, R5                 | happy path               | v1      | Valid user id                                  | GET /users/{id}     | `{id: "uuid-123"}`                          | `{ "id":"uuid-123","name":"Alice","email":"a@b.com" }`                         | 200  |
| Get non-existent user                        | R2, R6, R11            | misuse                   | v1      | Invalid user id                                | GET /users/{id}     | `{id: "uuid-999"}`                          | `{ "type":"not-found","message":"user not found" }`                            | 404  |
| Patch user success                           | R3, R5                 | happy path               | v1      | Partial update                                 | PATCH /users/{id}   | `{ "name": "Alice Updated" }`               | `{ "id":"uuid-123","name":"Alice Updated","email":"a@b.com" }`                 | 200  |
| Patch non-existent user                      | R3, R6, R11            | misuse                   | v1      | Invalid user id                                | PATCH /users/{id}   | `{ "name": "Ghost" }`                       | `{ "type":"not-found","message":"user not found" }`                            | 404  |
| Health check                                 | R4, R5                 | happy path               | v1      | N/A                                            | GET /health         | N/A                                         | `{ "status":"ok" }`                                                            | 200  |
| Version backward compatibility               | R1, R5, R7, R13        | backward compat          | v2-beta | Old client payload                             | POST /v2-beta/users | `{ "name": "Alice", "email": "a@b.com" }`   | `{ "id":"uuid-123","name":"Alice","email":"a@b.com" }`                         | 201  |
| Version breaking change test                 | R1, R6, R7, R13        | backward compat (misuse) | v2-beta | Payload missing new required field             | POST /v2-beta/users | `{ "name": "Alice" }`                       | `{ "type":"invalid-parameter","field":"email","message":"required" }`          | 400  |
| Test hook: inject latency                    | R1, R12                | test hooks               | v1      | `X-Debug-Inject-Latency:2000`                  | POST /users         | `{ "name": "Test", "email":"t@b.com" }`     | `{ "id":"uuid-999","name":"Test","email":"t@b.com" }`                          | 201  |
| Test hook: force error                       | R1, R6, R12            | test hooks               | v1      | `X-Debug-Fail-Next-Request:500`                | POST /users         | `{ "name": "Fail", "email":"f@b.com" }`     | `{ "type":"internal-error","message":"forced by test hook" }`                  | 500  |
| Large-scale creation                         | R1, R14                | scale tests              | v1      | 1000 concurrent valid users                    | POST /users         | valid payloads                              | all responses 201, no duplicates                                               | 201  |
