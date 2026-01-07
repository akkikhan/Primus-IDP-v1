# 🧪 Primus IDP - Quick Test Reference

## Running Tests

### E2E Browser Tests (Playwright)
```powershell
# Run all E2E tests
npx playwright test tests/e2e/primus-idp-smoke.spec.ts

# Run with UI (headed mode)
npx playwright test tests/e2e/primus-idp-smoke.spec.ts --headed

# Run specific test
npx playwright test tests/e2e/primus-idp-smoke.spec.ts -g "Homepage loads"

# View HTML report
npx playwright show-report docs\ai-browser-tests\playwright-report

# Debug mode (interactive)
npx playwright test tests/e2e/primus-idp-smoke.spec.ts --debug
```

### API Regression Tests (PowerShell)
```powershell
# Run from project root
.\comprehensive_api_test.ps1

# Or via VS Code task
Ctrl+Shift+P → "Run Task" → "Primus: Run API Regression Tests"
```

### QA Automation Pipeline (Combined)
```powershell
# Via VS Code task (runs both API + E2E tests)
Ctrl+Shift+P → "Run Task" → "Primus: QA Automation Pipeline"
```

---

## Test Files

| File | Type | Purpose |
|------|------|---------|
| `tests/e2e/primus-idp-smoke.spec.ts` | E2E | Core smoke tests (8 test cases) |
| `comprehensive_api_test.ps1` | API | Regression tests (27 endpoints) |
| `playwright.config.ts` | Config | Playwright browser automation settings |

---

## Current Test Coverage

### E2E Tests (8 total - 100% passing ✅)
- ✅ Homepage branding validation
- ✅ Backend API documentation accessibility
- ✅ Frontend navigation structure
- ✅ Auth endpoints status codes
- ✅ Dashboard authentication protection
- ✅ Search spaces routing patterns
- ✅ Auth register endpoint validation
- ✅ Browser extension manifest structure

### API Tests (27 total - 88.89% passing 🟢)
- ✅ 24 endpoints passing
- ❌ 3 known issues:
  - `POST /api/v1/auth/register` → 404
  - `GET /api/v1/search-spaces` → 404
  - `POST /api/v1/search-spaces/` → 404

---

## Prerequisites

### Services Must Be Running
```powershell
# Check service status
Test-NetConnection -ComputerName localhost -Port 8000  # Backend
Test-NetConnection -ComputerName localhost -Port 8001  # Frontend
docker ps | Select-String "primus-idp"                  # Database + Redis

# Start services if needed
docker start primus-idp-db-1
cd primus_idp_backend && python main.py --reload &
cd primus_idp_web && npm run dev &
```

### Environment Variables
- Backend: `primus_idp_backend/.env` (database, Redis, LLM configs)
- Frontend: `primus_idp_web/.env` (API URL, auth settings)

---

## Debugging Failed Tests

### 1. Check Test Output
```powershell
# Playwright saves screenshots + videos on failure
ls test-results\

# View error details
cat test-results\{test-name}\error-context.md
```

### 2. View HTML Report
```powershell
npx playwright show-report docs\ai-browser-tests\playwright-report
```

### 3. Run in Debug Mode
```powershell
# Interactive debugging with breakpoints
npx playwright test tests/e2e/primus-idp-smoke.spec.ts --debug

# Or use headed mode to watch browser
npx playwright test tests/e2e/primus-idp-smoke.spec.ts --headed --timeout=60000
```

### 4. Check Backend/Frontend Logs
```powershell
# Backend logs
cd primus_idp_backend && tail -f logs/uvicorn.log

# Frontend logs (in terminal where `npm run dev` is running)
```

---

## Adding New Tests

### E2E Test Template
```typescript
import { expect, test } from "@playwright/test";

test.describe("Feature Name", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/your-page");
    });

    test("Test description", async ({ page }) => {
        // Arrange
        await page.waitForLoadState("networkidle");

        // Act
        await page.getByRole("button", { name: "Click Me" }).click();

        // Assert
        await expect(page.getByText("Success")).toBeVisible();
    });
});
```

### API Test Template (PowerShell)
```powershell
$endpoint = "/api/v1/your-endpoint"
$response = Invoke-RestMethod -Uri "http://localhost:8000$endpoint" `
    -Method GET `
    -Headers @{"Authorization" = "Bearer $token"} `
    -ErrorAction SilentlyContinue

if ($response.status -eq 200) {
    Write-Host "✓ $endpoint" -ForegroundColor Green
} else {
    Write-Host "✗ $endpoint ($($response.status))" -ForegroundColor Red
}
```

---

## Common Issues

### Issue: Playwright Browser Not Found
```powershell
# Solution: Install browsers
npx playwright install chromium
```

### Issue: Port Already in Use
```powershell
# Solution: Kill process on port
netstat -ano | findstr :8000
taskkill /PID {process_id} /F
```

### Issue: Database Connection Failed
```powershell
# Solution: Start Docker containers
docker start primus-idp-db-1
docker start primus-idp-redis-1
```

### Issue: Tests Timeout
```powershell
# Solution: Increase timeout in playwright.config.ts
# Or use CLI flag
npx playwright test --timeout=60000
```

---

## CI/CD Integration (Future)

### GitHub Actions Workflow
```yaml
name: Primus IDP Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright
        run: npx playwright install chromium
      - name: Run E2E tests
        run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: docs/ai-browser-tests/playwright-report/
```

---

## Reports

### Artifacts Location
- **HTML Report**: `docs/ai-browser-tests/playwright-report/`
- **JSON Results**: `docs/ai-browser-tests/results.json`
- **Screenshots**: `test-results/{test-name}/test-failed-1.png`
- **Videos**: `test-results/{test-name}/video.webm`
- **Error Context**: `test-results/{test-name}/error-context.md`

### Viewing Reports
```powershell
# Interactive HTML report (recommended)
npx playwright show-report docs\ai-browser-tests\playwright-report

# JSON results
Get-Content docs\ai-browser-tests\results.json | ConvertFrom-Json | Format-Table
```

---

## VS Code Tasks

### Available Tasks (Ctrl+Shift+P → "Run Task")
1. **Primus: Build and Run** - Start backend + frontend
2. **Primus: Run API Regression Tests** - PowerShell API test suite
3. **Primus: Trigger AI Browser Agent** - External browser agent (fallback)
4. **Primus: QA Automation Pipeline** - Full test suite (API + E2E)

### Task Configuration
Location: `.vscode/tasks.json`

---

## Key Contacts & Resources

- **Documentation**: https://www.primusidp.net/docs/
- **GitHub**: https://github.com/khanakkijpr-dot/Primus-IDP
- **Discord**: https://discord.gg/ejRNvftDp9
- **Issues**: https://github.com/khanakkijpr-dot/Primus-IDP/issues

---

**Last Updated**: 2025-11-30  
**Test Framework**: Playwright v1.49.0  
**Browser**: Chromium 141.0.7390.37  
**Pass Rate**: 100% E2E, 88.89% API
