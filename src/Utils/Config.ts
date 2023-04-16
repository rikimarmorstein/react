class Config{

}

class DevelopmentConfig{
    public adminUrl = "http://localhost:8080/api/admin/";
    public companyUrl = "http://localhost:8080/api/company/";
    public customerUrl = "http://localhost:8080/api/customer/";
    public authUrl = "http://localhost:8080/auth/login";
    public allCoupons = "http://localhost:8080/allCoupons";
    // public files = "http://localhost:8080/images/";

        
    // public productsImagesUrl = "http://localhost:3030/api/products/images/";
}

class ProductionConfig{
    public adminUrl = "http://localhost:8080/api/admin/";
    public companyUrl = "http://localhost:8080/api/company/";
    public customerUrl = "http://localhost:8080/api/customer/";
    public authUrl = "http://localhost:8080/auth/login";
    public allCoupons = "http://localhost:8080/allCoupons";
    // public files = "http://localhost:8080/images/";

    // public productsImagesUrl = "http://localhost:8080/api/products/images/";
}

const appConfig = process.env.NODE_ENV==="development"
? new DevelopmentConfig(): new ProductionConfig();
export default appConfig;