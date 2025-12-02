[[#1. Requirements Analysis]]
[[#2. Risk Identification]]
[[#3. Test Design]]
[[#4. Traceability & Coverage]]
[[#5. MECE Assessment]]

### 1. Requirements Analysis

- **Diagram** system components and interactions to identify:
    - Module dependencies
    -  Data and control flows
    -  External interfaces and stakeholder touchpoints
- **Purpose**:  Detect untested paths,  highlight high-risk areas, and  clarify system boundaries before dynamic testing.

| REQ-ID | Description                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------ |
| REQ-01 | Login API must accept valid username and password and return a valid token.                            |
| REQ-02 | System must lock the account after repeated failed login attempts.                                     |
| REQ-03 | System must enforce password policies (expiry, minimum length, unverified accounts, etc.).             |
| REQ-04 | Login API must handle dependent services gracefully (DB, Token Service) and return appropriate errors. |
| REQ-05 | Login API must be secure against common attacks (SQL injection, replay attacks, token tampering).      |
| REQ-06 | Login API must meet performance SLAs (latency < 200ms for normal load).                                |
(To be replaced or that's fine enough)
![[Pasted image 20251202210754.png]]

---
### 2. Risk Identification

- **Module-level risks (internal):** Logic failures, exceptions, edge cases,  module-specific risks.
- **Interface-level risks (connections):** API mismatches, data propagation errors, rollback issues.
- **Business/Stakeholder impact risks:** Customer-facing critical paths, SLAs(Availability/Uptime, Response time, Throughout or Capacity, Error handling / incident resolution time), regulatory compliance.

| RSK-ID | Description                                                              | Risk Scope                        |
| ------ | ------------------------------------------------------------------------ | --------------------------------- |
| RSK-01 | Valid login path fails (functional defect).                              | Functional / End-to-End Flow      |
| RSK-02 | Invalid credentials incorrectly accepted or rejected.                    | Functional / Authentication Logic |
| RSK-03 | Missing or null credentials are not handled properly.                    | Functional / Input Validation     |
| RSK-04 | Account lockout mechanism not working or misfiring.                      | Functional / Security Policy      |
| RSK-05 | Expired password incorrectly accepted.                                   | Functional / Security Policy      |
| RSK-06 | Unverified account bypasses verification check.                          | Functional / Security Policy      |
| RSK-07 | DB outage or timeout causes login failure without proper error.          | Integration / Database            |
| RSK-08 | Token Service failure causes unhandled exceptions or incorrect response. | Integration / Token Service       |
| RSK-09 | SQL Injection attack succeeds.                                           | Security / Input Validation       |
| RSK-10 | Replay attack allows reuse of login/nonces.                              | Security / Session Management     |
| RSK-11 | Token tampering not detected; compromised session possible.              | Security / Token Validation       |
| RSK-12 | Performance SLA is violated under normal load.                           | Non-Functional / Performance      |

---
### 3. Test Design

**Principle:** Each risk is linked to one or more functional or non-functional tests to ensure coverage.
#### 3.1 Functional Testing
-  Black-box (End-to-End)
    -  Positive scenarios
    -  Negative scenarios
    -  Edge cases
- Grey-box (Integration,  Module interactions)
    - Positive scenarios: normal flows,
    - Negative scenarios: fault injection, rollback
    - Edge cases
- White-box (Unit)
    - Positive scenarios
    - Negative scenarios: exceptions, invalid inputs
    - Edge cases: boundary conditions, nulls, off-by-one
#### 3.2 Non-Functional Testing
- **Performance:** Idempotency, throttling, eventual consistency
- **Load & Concurrency:** Race conditions, stress, scalability limits
- **Security:** Access control, injection attacks, vulnerability scanning
- **Reliability & Maintainability (optional but recommended):** Fault tolerance, monitoring, logging coverage

```gherkin
Feature: Login API requirements matrix test

	Scenario Outline: API scenario driven by test matrix
	  Given requirement "<REQ-ID>"
	  Given requirement risk "<RISK-ID>"
	  Given the "<Test-ID>"
	  Given the test "<Scenario Name>"
	  Given the client sends "<Client INput>"
	  When the API Gateway forwards the "<API Gateway>" request 
	  And the Auth Service processes the "<Auth Service>"request 
	  And the DB responds with "<DB Response>"
	  And the Auth validation result is "<Auth Validation>"
	  And the Token Service returns "<Token Service>" response
	  Then the API response expected to be"<API Response>"
	  And the client outcome expected to be"<Client Outcome>"
```


_This table serves as a single source of truth and can be vertically or column-wise separated according to test focus (E2E, integration, unit, functional, or non-functional) so each layer or type consumes only the relevant parts. Run this Scenario Outline in your Cucumber framework._

| Req-ID | Risk-ID | Test ID | Scenario Name         | Client Input                | API Gateway        | Auth Service       | DB Response                | Auth Validation    | Token Service       | API Response            | Client Outcome          |
| ------ | ------- | ------- | --------------------- | --------------------------- | ------------------ | ------------------ | -------------------------- | ------------------ | ------------------- | ----------------------- | ----------------------- |
| REQ-01 | RSK-01  | F01     | Successful Login      | login=x, pass=y             | POST /login        | receives creds     | returns user record        | creds valid        | token issued        | 200 OK + token          | token received          |
| REQ-01 | RSK-02  | F02     | Invalid Credentials   | login=x, pass=wrong         | POST /login        | receives creds     | returns user record        | creds invalid      | N/A                 | 401 Unauthorized        | login failed            |
| REQ-01 | RSK-03  | F03     | Missing Credentials   | login=null, pass=null       | POST /login        | invalid request    | N/A                        | validation failed  | N/A                 | 400 Bad Request         | input error             |
| REQ-02 | RSK-04  | F04     | User Locked           | login=x, pass=y             | POST /login        | receives creds     | returns locked user        | user locked        | N/A                 | 423/403 Forbidden       | account locked          |
| REQ-03 | RSK-05  | F05     | Password Expired      | login=x, pass=oldpass       | POST /login        | receives creds     | returns user record        | password expired   | N/A                 | 403 Forbidden           | password reset required |
| REQ-03 | RSK-06  | F06     | Account Not Verified  | login=x, pass=y             | POST /login        | receives creds     | returns unverified status  | unverified         | N/A                 | 403 Forbidden           | verification required   |
| REQ-04 | RSK-07  | F07     | DB Unavailable        | login=x, pass=y             | POST /login        | receives creds     | DB timeout / error         | cannot validate    | N/A                 | 500 Server Error        | error shown             |
| REQ-04 | RSK-08  | F08     | Token Service Down    | login=x, pass=y             | POST /login        | receives creds     | returns user record        | creds valid        | service unavailable | 503 Service Unavailable | error shown             |
| REQ-05 | RSK-09  | S01     | SQL Injection Attempt | login="' OR 1=1 --", pass=x | POST /login        | receives creds     | escaped query returns none | invalid input      | N/A                 | 400/401 Error           | malicious input blocked |
| REQ-05 | RSK-10  | S02     | Replay Attack         | login=x, nonce=reused       | POST /login        | detects replay     | N/A                        | replay flagged     | N/A                 | 409 Conflict            | replay blocked          |
| REQ-05 | RSK-11  | S03     | Token Tampering       | tampered token in request   | POST /login/verify | verifies signature | N/A                        | signature mismatch | N/A                 | 401 Unauthorized        | token rejected          |
| REQ-06 | RSK-12  | NF01    | Performance Baseline  | login=x, pass=y             | POST /login        | receives creds     | returns user record        | creds valid        | token issued        | 200 OK (<200ms SLA)     | login meets SLA         |


---
### **4. Traceability & Coverage**
- Map **each test to its corresponding risk and requirement**
- Track coverage for functional, integration, and non-functional areas
- Prioritize testing for:
    - Critical user journeys
    - High-risk modules
    - SLA or regulatory-driven components

| REQ \ RSK | RSK-01 | RSK-02 | RSK-03 | RSK-04 | RSK-05 | RSK-06 | RSK-07 | RSK-08 | RSK-09 | RSK-10 | RSK-11 | RSK-12 |
| --------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| REQ-01    | X      | X      | X      |        |        |        |        |        |        |        |        |        |
| REQ-02    |        |        |        | X      |        |        |        |        |        |        |        |        |
| REQ-03    |        |        |        |        | X      | X      |        |        |        |        |        |        |
| REQ-04    |        |        |        |        |        |        | X      | X      |        |        |        |        |
| REQ-05    |        |        |        |        |        |        |        |        | X      | X      | X      |        |
| REQ-06    |        |        |        |        |        |        |        |        |        |        |        | X      |

| RSK \ Test | F01 | F02 | F03 | F04 | F05 | F06 | F07 | F08 | S01 | S02 | S03 | NF01 |
| ---------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- |
| RSK-01     | X   |     |     |     |     |     |     |     |     |     |     |      |
| RSK-02     |     | X   |     |     |     |     |     |     |     |     |     |      |
| RSK-03     |     |     | X   |     |     |     |     |     |     |     |     |      |
| RSK-04     |     |     |     | X   |     |     |     |     |     |     |     |      |
| RSK-05     |     |     |     |     | X   |     |     |     |     |     |     |      |
| RSK-06     |     |     |     |     |     | X   |     |     |     |     |     |      |
| RSK-07     |     |     |     |     |     |     | X   |     |     |     |     |      |
| RSK-08     |     |     |     |     |     |     |     | X   |     |     |     |      |
| RSK-09     |     |     |     |     |     |     |     |     | X   |     |     |      |
| RSK-10     |     |     |     |     |     |     |     |     |     | X   |     |      |
| RSK-11     |     |     |     |     |     |     |     |     |     |     | X   |      |
| RSK-12     |     |     |     |     |     |     |     |     |     |     |     | X    |

### 5. MECE Assessment

| Section                 | ME  | CE  | Notes                                                           |
| ----------------------- | --- | --- | --------------------------------------------------------------- |
| Requirements            | ✅   | ⚠️  | Could include logging, MFA, error messaging                     |
| Risk Identification     | ✅   | ⚠️  | Could include operational, concurrency, and cross-cutting risks |
| Test Design             | ✅   | ⚠️  | Edge-case and extreme-load tests could be added                 |
| Traceability & Coverage | ✅   | ✅   | -                                                               |
| **Overall MECE**        | ✅   | ⚠️  | Minor gaps in exhaustiveness                                    |
