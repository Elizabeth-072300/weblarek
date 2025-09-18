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
import { apiProducts } from './utils/data';
import { IProduct, IBuyer } from './types';
import { Cart } from './components/base/Models/Cart';
import { Buyer } from './components/base/Models/Buyer';

// Тестирование ProductCatalog
const catalog = new ProductCatalog();

catalog.setProducts(apiProducts.items);
console.log('Сохранили товары в каталог:', apiProducts.items.length, 'шт.');

const allProducts = catalog.getProducts();
console.log('Все товары из каталога:', allProducts);

let foundProduct: IProduct | undefined;
const firstProductId = allProducts[0]?.id;
if (firstProductId) {
    foundProduct = catalog.getProductById(firstProductId);
    console.log('Найден товар по ID', firstProductId, ':', foundProduct);
}

if (foundProduct) {
    catalog.setSelectedProduct(foundProduct);
    console.log('Установлен выбранный товар для просмотра:', catalog.getSelectedProduct());
}

// Тестирование ShoppingCart
const cart = new Cart();

const product1 = allProducts[0];
const product2 = allProducts[1];

if (product1 && product2) {
    cart.addItem(product1);
    cart.addItem(product2);
    console.log('Добавили 2 товара в корзину');
}

console.log('Товары в корзине:', cart.getItems());

console.log(`Есть ли товар с id "${product1?.id}" в корзине?`, cart.hasItem(product1?.id || ''));

console.log('Общая стоимость:', cart.getTotalPrice());

console.log('Количество товаров в корзине:', cart.getTotalCount());

if (product1) {
    cart.removeItem(product1.id);
    console.log(`Удалили товар с id "${product1.id}"`);
}

console.log('Товары в корзине после удаления:', cart.getItems());
console.log('Количество после удаления:', cart.getTotalCount());

cart.clear();
console.log('Корзина очищена. Товаров:', cart.getTotalCount());

// Тестирование Buyer
const buyer = new Buyer();
const testBuyerData: IBuyer = {
    payment: 'card',
    email: 'abb@example.com',
    phone: '+79253457525',
    address: 'ул. Верховая 3'
};

buyer.setBuyerData(testBuyerData);
console.log('Сохранили данные покупателя:', buyer.getBuyerData());

buyer.payment = 'cash';
buyer.email = 'teer@example.com';
console.log('Обновили payment и email:', buyer.getBuyerData());

const validation = buyer.validate();
console.log('Валидация данных:', validation);

buyer.email = 'invalid-email';
buyer.phone = '';
const invalidValidation = buyer.validate();
console.log('Валидация с ошибками:', invalidValidation);

buyer.clear();
console.log('Данные покупателя очищены');

try {
    buyer.getBuyerData();
} catch (err) {
    console.log('Ожидаемая ошибка при попытке получить данные после очистки:', (err as Error).message);
}
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