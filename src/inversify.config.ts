import { Container } from "inversify";
import { UserService } from "./services/userServices";
import { userController } from "./controllers/userController";
import { ProfileService } from "./services/profileServices";
import { ProfileController } from "./controllers/profileController";
import { ProductController } from "./controllers/productController";
import { ProductService } from "./services/productServices";
import { CartController } from "./controllers/cartController";
import { CartService } from "./services/cartServices";
const container = new Container();

container.bind<userController>("userController").to(userController)
container.bind<ProfileController>("ProfileController").to(ProfileController)


container.bind<UserService>("UserService").to(UserService);
container.bind<ProfileService>("ProfileService").to(ProfileService);
container.bind<ProductController>("ProductController").to(ProductController);
container.bind<ProductService>("ProductService").to(ProductService);
container.bind<CartController>("CartController").to(CartController);
container.bind<CartService>("CartService").to(CartService);

container

export { container };
