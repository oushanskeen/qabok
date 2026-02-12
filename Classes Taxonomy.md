#OOP

Classes (objects from OOP) can be categorized along **two axes**:
1. **State ownership / purity** (does it hold state, is it mutable, is it pure?)
2. **Layer / role** (domain, application, infrastructure, utility).

Here’s the full taxonomy:

| **Class Type**                                          | **Layer / Role**     | **What it Owns**                                          | **Behavior / Responsibility**                                                   | **Side Effects**                                  | **Testing Notes**                                                |
| ------------------------------------------------------- | -------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------- |
| **Functional / Utility**                                | Utility              | None                                                      | Pure functions, helpers, formatting, calculations                               | ❌ None                                            | Fully deterministic; unit-testable                               |
| **State Machine**                                       | Domain               | Explicit domain state (vectors)                           | Encapsulates state + transitions; enforces invariants                           | ❌ None                                            | Unit-testable; deterministic; models business rules              |
| **Actor / Reducer**                                     | Domain / Application | Optionally transient domain state                         | Pure reducer wrapped in message handler; orchestrates deterministic transitions | ✅ Only through explicit handler (e.g., DB, event) | Unit-testable for reducer; integration test for handler          |
| **Context-Heavy / Execution Service**                   | Application          | Request-scoped context: cache, tx, metrics, feature flags | Orchestrates domain logic + side effects; enforces lifecycle & boundaries       | ✅ Yes, scoped to request                          | Unit-testable with mocks; orchestrates multiple domain calls     |
| **Infrastructure Wrapper**                              | Infrastructure       | External system clients (DB, cache, HTTP)                 | Encapsulates IO and retries; exposes safe API to application                    | ✅ Yes                                             | Mockable; used by application services                           |
| **Domain Entity Object**                                | Domain               | Entity state + identity                                   | Holds domain attributes, validation, invariants                                 | ❌ Only manipulates own state deterministically    | Unit-testable; often immutable or controlled mutation            |
| **Service Facade / Orchestration** (sometimes optional) | Application          | Aggregated dependencies                                   | High-level entry point for API requests; calls multiple domain/repo services    | ✅ Yes                                             | Unit-testable with mocks; handles request scope and side effects |

---

## **Key Observations / Rules**
1. **Purity vs. Context**
    - Domain classes → **pure or controlled state only**
    - Application classes → **may be imperative and side-effecting**, but only within request scope
2. **State Ownership**
    - State machines → own explicit domain state
    - Context-heavy services → own _execution context_, not domain truth
3. **Dependency Direction**
    - Higher layers can depend on lower layers
    - **Domain → no infra**, **Utility → nothing**, **Application → domain + infra + utils**
4. **Testing Strategy**
    - Pure domain → deterministic unit tests
    - Application / orchestration → mocks for dependencies
    - Infrastructure → integration tests
        

---

## **Mapping to Our Billing Example**

|Class|Class Type|Layer|
|---|---|---|
|`uuid()` / `formatCurrency()`|Functional / Utility|Utility|
|`BillingRepository`|Infrastructure wrapper|Infrastructure|
|`createInvoice(state, cmd)`|Reducer / State Machine|Domain|
|`BillingApplicationService`|Context-Heavy Service|Application|

