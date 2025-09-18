import './scss/styles.scss';
// const API_URL = import.meta.env.VITE_API_ORIGIN;

// fetch(`${API_URL}/products`)
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((err) => console.error('Ошибка запроса:', err));
import { ProductCatalog } from './components/base/Models/ProductCatalog';
import { Api } from './components/base/Api';
import { ApiService } from './components/API/Api.main';
import { API_URL } from './utils/constants';

// import { apiProducts } from './utils/data';
// const productsModel = new ProductCatalog();
// productsModel.setProducts(apiProducts.items);
// console.log('Массив товаров из каталога:', productsModel.getProducts());
const api = new Api(API_URL);
const apiService = new ApiService(api);
const productCatalog = new ProductCatalog();
apiService.getProducts()
    .then(products => {
        console.log('Получено товаров с сервера:', products.length);

        // Сохраняем в модель
        productCatalog.setProducts(products);
        console.log('Каталог сохранён в ProductCatalog');

        // Проверяем содержимое модели
        const storedProducts = productCatalog.getProducts();
        console.log('Товары в каталоге после загрузки:', storedProducts);
    })
    .catch(err => {
        console.error('Ошибка при загрузке товаров:', err);
    })
    .finally(() => {
        console.log('Все тесты моделей данных пройдены!');
    });