#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Create a premium, modern, trustworthy website for DaliMoto tire and auto repair shop in Kladno. Dark blue/black palette with orange accents, Next.js 15, Tailwind, Framer Motion. Sections: Hero, Services, Pricing, Why Us, Reviews, 4-step Process, FAQ, Contact with Google Maps embed and form. Must achieve 100% content parity with original dalimoto.cz."

backend:
  - task: "Contact form submission API (POST /api/contact)"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Implemented POST /api/contact saving { name, phone, email, service, message } to MongoDB 'contacts' collection with uuid id and createdAt timestamp. Requires name and phone (returns 400 otherwise). Needs validation of happy path + error path."
        - working: true
          agent: "testing"
          comment: "✅ TESTED & VERIFIED: POST /api/contact works correctly. Valid submission returns 200 with { ok: true, id: uuid }. Missing name returns 400 with Czech error 'Jméno a telefon jsou povinné'. Missing phone returns 400 with same error. Data persists to MongoDB 'contacts' collection. All validation working as expected."

  - task: "Health check & list endpoints (GET /api/health, GET /api/contacts)"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "GET /api/ and /api/health return service info. GET /api/contacts returns recent contacts (no _id). Verify both work and contacts list reflects newly inserted records."
        - working: true
          agent: "testing"
          comment: "✅ TESTED & VERIFIED: GET /api/health and GET /api/ both return 200 with { ok: true, service: 'DaliMoto API', time: ISO }. GET /api/contacts returns 200 with contacts array, no _id field leaked, correctly shows inserted records. GET /api/unknown returns 404. OPTIONS /api/contact returns 204 with CORS headers. All endpoints working perfectly."

frontend:
  - task: "Premium landing page rendering with all sections"
    implemented: true
    working: true
    file: "/app/app/page.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Verified via screenshot tool — Hero, Pricing (expanded), Products, Why Us, 4-step process, Reviews, FAQ, Contact form + Google Maps, Footer all render correctly with dark navy/orange theme. Cookie banner visible."

  - task: "GDPR Cookie Banner with localStorage persistence"
    implemented: true
    working: true
    file: "/app/app/page.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "CookieBanner uses localStorage key 'dalimoto-cookies'. Shows only when not set; click 'Rozumím' sets it and hides banner."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 2
  run_ui: false

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    - agent: "main"
      message: "Please test the backend /api routes for the DaliMoto site. Verify: (1) GET /api/health returns 200 with ok:true. (2) POST /api/contact with valid { name, phone, email, service, message } returns 200 with ok:true and id. (3) POST /api/contact without name or phone returns 400. (4) GET /api/contacts returns the inserted record. MongoDB is local; uses MONGO_URL + DB_NAME env vars. Base URL: use process.env.NEXT_PUBLIC_BASE_URL from /app/.env appended with /api."
    - agent: "testing"
      message: "✅ BACKEND TESTING COMPLETE - ALL TESTS PASSED (8/8). Tested all API endpoints: GET /api/health ✓, GET /api/ ✓, POST /api/contact (valid/invalid) ✓, GET /api/contacts ✓, GET /api/unknown (404) ✓, OPTIONS /api/contact (CORS) ✓. MongoDB connection working, data persists correctly, no _id leaked, validation working. All backend functionality is production-ready. No issues found."
