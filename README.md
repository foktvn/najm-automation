# 🧪 Cypress OTP Registration Automation with MailSlurp

This is an end-to-end (E2E) testing project using [Cypress](https://www.cypress.io/) to automate user flows for [Najm Course](https://cat.najmcourse.com), including authentication, registration with OTP, and other core functionalities.

---

## 🔧 Tech Stack
- ✅ Cypress (End-to-End Testing)
- ✅ MailSlurp (Temporary Email API)
- ✅ Node.js (via Cypress runner)

---

## 🚀 Getting Started

### 1. Clone this repo

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure MailSlurp

- Go to [MailSlurp Dashboard](https://app.mailslurp.com/)
- Copy your **API Key**
- Create `.env` or directly paste into the test/config

**Example:**

```js
const mailslurp = new MailSlurp({ apiKey: "YOUR_API_KEY" });
```

### 4. Run Cypress Test

```bash
npx cypress open
# or headless
npx cypress run
```
---

## 🤝 Contributing

Feel free to fork and enhance this for:
- Login automation
- Negative test cases
- API-only registration flows

---

> Happy Testing! 🧪🚀
