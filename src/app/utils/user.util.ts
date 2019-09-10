export class UserUtil {

    static get(): any {
        const data = localStorage.getItem('eshop.user');
        if (data) return JSON.parse(data);
        return null;
    }

    static set(data: any): any {
        localStorage.setItem('eshop.user', JSON.stringify(data));
    }

    static clear(): any {
        localStorage.removeItem('eshop.user');
    }
}