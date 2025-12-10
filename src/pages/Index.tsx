import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  type: 'cigarette' | 'vape' | 'liquid';
  price: number;
  nicotine: number;
  flavor: string;
  image: string;
  popular?: boolean;
}

const products: Product[] = [
  { id: 1, name: 'IQOS Iluma Prime', type: 'cigarette', price: 4990, nicotine: 0, flavor: 'Табак', image: '🔥', popular: true },
  { id: 2, name: 'VAPORESSO XROS 3', type: 'vape', price: 2490, nicotine: 0, flavor: 'Универсальный', image: '💨', popular: true },
  { id: 3, name: 'Elf Bar BC5000', type: 'vape', price: 1190, nicotine: 50, flavor: 'Ягоды', image: '⚡', popular: true },
  { id: 4, name: 'Жидкость Fruitbae 30ml', type: 'liquid', price: 590, nicotine: 35, flavor: 'Фруктовый микс', image: '🍓' },
  { id: 5, name: 'GLO Hyper X2', type: 'cigarette', price: 3490, nicotine: 0, flavor: 'Табак', image: '🔥' },
  { id: 6, name: 'SMOK Nord 4', type: 'vape', price: 2190, nicotine: 0, flavor: 'Универсальный', image: '💨' },
  { id: 7, name: 'Жидкость Salt 30ml', type: 'liquid', price: 490, nicotine: 20, flavor: 'Мята', image: '🌿' },
  { id: 8, name: 'Lost Mary BM5000', type: 'vape', price: 1290, nicotine: 50, flavor: 'Манго', image: '🥭' },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['cigarette', 'vape', 'liquid']);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [nicotineRange, setNicotineRange] = useState([0, 50]);
  const [cartCount, setCartCount] = useState(0);

  const flavors = ['Табак', 'Ягоды', 'Мята', 'Фруктовый микс', 'Манго', 'Универсальный'];

  const filteredProducts = products.filter(product => {
    const typeMatch = selectedTypes.includes(product.type);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const flavorMatch = selectedFlavors.length === 0 || selectedFlavors.includes(product.flavor);
    const nicotineMatch = product.nicotine >= nicotineRange[0] && product.nicotine <= nicotineRange[1];
    return typeMatch && priceMatch && flavorMatch && nicotineMatch;
  });

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleFlavor = (flavor: string) => {
    setSelectedFlavors(prev =>
      prev.includes(flavor) ? prev.filter(f => f !== flavor) : [...prev, flavor]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-3xl">💨</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                VAPE STORE
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              {['home', 'catalog', 'delivery', 'reviews', 'about', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'delivery' && 'Доставка'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'about' && 'О нас'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </nav>

            <Button variant="outline" className="relative">
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {activeSection === 'home' && (
        <>
          <section className="relative overflow-hidden py-20 px-4">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
            <div className="container mx-auto relative z-10 text-center animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Твой Стиль, Твой Вкус
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Огромный выбор электронных сигарет, вейпов и жидкостей с доставкой по всему городу
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90" onClick={() => setActiveSection('catalog')}>
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Смотреть каталог
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="Truck" size={20} className="mr-2" />
                  Доставка
                </Button>
              </div>
            </div>
          </section>

          <section className="py-16 px-4 container mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">🔥 Популярные товары</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.filter(p => p.popular).map((product) => (
                <Card key={product.id} className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 animate-scale-in bg-card border-border">
                  <CardContent className="p-6">
                    <div className="text-6xl mb-4 text-center">{product.image}</div>
                    <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      <Badge variant="secondary">{product.flavor}</Badge>
                      {product.nicotine > 0 && (
                        <Badge variant="outline">{product.nicotine}mg</Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price}₽</span>
                      <Button size="sm" onClick={() => setCartCount(cartCount + 1)} className="bg-gradient-to-r from-primary to-secondary">
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}

      {activeSection === 'catalog' && (
        <section className="py-12 px-4 container mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Каталог товаров
          </h2>
          
          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 space-y-6">
              <Card className="bg-card border-border animate-fade-in">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Icon name="Filter" size={20} className="text-primary" />
                    Фильтры
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-medium mb-3">Тип товара</p>
                      <div className="space-y-2">
                        {[
                          { value: 'cigarette', label: 'Электронные сигареты', icon: '🔥' },
                          { value: 'vape', label: 'Вейпы', icon: '💨' },
                          { value: 'liquid', label: 'Жидкости', icon: '💧' }
                        ].map(type => (
                          <div key={type.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={type.value}
                              checked={selectedTypes.includes(type.value)}
                              onCheckedChange={() => toggleType(type.value)}
                            />
                            <label htmlFor={type.value} className="text-sm cursor-pointer">
                              {type.icon} {type.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-3">Цена: {priceRange[0]}₽ - {priceRange[1]}₽</p>
                      <Slider
                        min={0}
                        max={5000}
                        step={100}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-2"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-3">Крепость: {nicotineRange[0]}mg - {nicotineRange[1]}mg</p>
                      <Slider
                        min={0}
                        max={50}
                        step={5}
                        value={nicotineRange}
                        onValueChange={setNicotineRange}
                        className="mb-2"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-3">Вкус</p>
                      <div className="space-y-2">
                        {flavors.map(flavor => (
                          <div key={flavor} className="flex items-center space-x-2">
                            <Checkbox
                              id={flavor}
                              checked={selectedFlavors.includes(flavor)}
                              onCheckedChange={() => toggleFlavor(flavor)}
                            />
                            <label htmlFor={flavor} className="text-sm cursor-pointer">
                              {flavor}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedTypes(['cigarette', 'vape', 'liquid']);
                        setPriceRange([0, 5000]);
                        setSelectedFlavors([]);
                        setNicotineRange([0, 50]);
                      }}
                    >
                      Сбросить фильтры
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>

            <div className="lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Найдено товаров: <span className="font-bold text-foreground">{filteredProducts.length}</span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card key={product.id} className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 bg-card border-border" style={{ animationDelay: `${index * 50}ms` }}>
                    <CardContent className="p-6">
                      <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">
                        {product.image}
                      </div>
                      <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                      <div className="flex gap-2 mb-3 flex-wrap">
                        <Badge variant="secondary">{product.flavor}</Badge>
                        {product.nicotine > 0 && (
                          <Badge variant="outline">{product.nicotine}mg</Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{product.price}₽</span>
                        <Button size="sm" onClick={() => setCartCount(cartCount + 1)} className="bg-gradient-to-r from-primary to-secondary">
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'delivery' && (
        <section className="py-12 px-4 container mx-auto max-w-4xl animate-fade-in">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Доставка и оплата
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="text-4xl mb-4 text-center">🚀</div>
                <h3 className="font-bold text-xl mb-2 text-center">Быстрая доставка</h3>
                <p className="text-muted-foreground text-center">
                  Доставка по городу от 1 часа. Бесплатно при заказе от 2000₽
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="text-4xl mb-4 text-center">💳</div>
                <h3 className="font-bold text-xl mb-2 text-center">Любой способ оплаты</h3>
                <p className="text-muted-foreground text-center">
                  Наличные, карта, онлайн-оплата. Выбирайте удобный способ
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <h3 className="font-bold text-2xl mb-4">Условия доставки</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>• Доставка по городу: 250₽ (бесплатно от 2000₽)</p>
                <p>• Время доставки: 1-3 часа</p>
                <p>• Экспресс-доставка за 1 час: 500₽</p>
                <p>• Самовывоз из магазина: бесплатно</p>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {activeSection === 'reviews' && (
        <section className="py-12 px-4 container mx-auto max-w-4xl animate-fade-in">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Отзывы наших клиентов
          </h2>
          
          <div className="space-y-6">
            {[
              { name: 'Александр', rating: 5, text: 'Отличный магазин! Быстрая доставка, большой выбор. Рекомендую!' },
              { name: 'Мария', rating: 5, text: 'Заказываю здесь постоянно. Всегда свежие жидкости и приятные цены.' },
              { name: 'Дмитрий', rating: 4, text: 'Хороший ассортимент вейпов. Консультанты помогли с выбором.' }
            ].map((review, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                      👤
                    </div>
                    <div>
                      <p className="font-bold">{review.name}</p>
                      <div className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <span key={i} className="text-accent">⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="py-12 px-4 container mx-auto max-w-4xl animate-fade-in">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            О нас
          </h2>
          
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">💨</div>
                <h3 className="text-2xl font-bold mb-4">VAPE STORE</h3>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Мы — команда энтузиастов, которая знает всё о вейпинге. Наш магазин работает с 2020 года
                  и за это время мы помогли тысячам людей найти идеальное устройство.
                </p>
                <p>
                  В нашем ассортименте только оригинальная продукция от проверенных производителей.
                  Мы следим за новинками рынка и всегда готовы проконсультировать вас.
                </p>
                <p className="font-medium text-foreground">
                  Наша миссия — сделать вейпинг доступным и приятным для каждого.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-12 px-4 container mx-auto max-w-4xl animate-fade-in">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Контакты
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={24} className="text-primary" />
                  <div>
                    <p className="font-medium">Телефон</p>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={24} className="text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">info@vapestore.ru</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={24} className="text-primary" />
                  <div>
                    <p className="font-medium">Адрес</p>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={24} className="text-primary" />
                  <div>
                    <p className="font-medium">Режим работы</p>
                    <p className="text-muted-foreground">Ежедневно 10:00 - 22:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4">Мы в соцсетях</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Send" size={20} className="mr-2" />
                    Telegram
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Instagram" size={20} className="mr-2" />
                    Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <footer className="mt-20 border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="mb-2">© 2024 VAPE STORE. Все права защищены.</p>
          <p className="text-sm">Продажа никотинсодержащей продукции лицам старше 18 лет</p>
        </div>
      </footer>
    </div>
  );
}