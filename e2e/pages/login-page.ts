import { Page } from "@playwright/test";
import { routes } from '../core/routes'

class LoginPage {
    private readonly username;
    private readonly password;
    private readonly loginButton;
    
    constructor(private readonly page: Page) {
        this.username = this.page.locator("#username");
        this.password = this.page.locator("#password");
        this.loginButton = this.page.locator("#kc-login");
    }

    async navigateToLogin() {
        await this.page.goto(routes.home);
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}

export default LoginPage;