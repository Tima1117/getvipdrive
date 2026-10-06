export type Lang = "en" | "ru" | "ka";
export type Text = Record<Lang, string>;
export const t = (en: string, ru: string, ka: string): Text => ({ en, ru, ka });

export type Region = "mountains" | "canyons" | "city" | "multi";

export type Tour = {
  id: string;
  n: number;
  name: Text;
  region: Region;
  photo: string;
  photoPos?: string;
  duration: Text;
  stops: Text[];
  includes: Text;
  price: number;
  priceUnit: "pp" | "car" | "day";
  tag?: Text;
};

export const regions: { id: Region | "all"; label: Text }[] = [
  { id: "all", label: t("All routes", "Все маршруты", "ყველა მარშრუტი") },
  { id: "mountains", label: t("Mountains & waterfalls", "Горы и водопады", "მთები და ჩანჩქერები") },
  { id: "canyons", label: t("Canyons & caves", "Каньоны и пещеры", "კანიონები და მღვიმეები") },
  { id: "city", label: t("City & coast", "Город и побережье", "ქალაქი და სანაპირო") },
  { id: "multi", label: t("Multi-day", "Многодневные", "მრავალდღიანი") },
];

export const tours: Tour[] = [
  {
    id: "adjara", n: 1, region: "mountains", photo: "/images/tour-waterfalls.webp", price: 35, priceUnit: "pp",
    name: t("Adjara mountains & waterfalls", "Горная Аджария и водопады", "მთიანი აჭარა და ჩანჩქერები"),
    duration: t("8–9 h", "8–9 ч", "8–9 სთ"),
    stops: [t("Makhuntseti waterfall", "Водопад Махунцети", "მახუნცეთის ჩანჩქერი"), t("Queen Tamar bridge", "Мост царицы Тамары", "თამარ მეფის ხიდი"), t("Mirveti waterfall walk", "Прогулка к водопаду Мирвети", "მირვეთის ჩანჩქერი"), t("Keda family winery", "Семейная винодельня в Кеде", "ოჯახური მარანი ქედაში"), t("Viewpoint above the clouds", "Смотровая над облаками", "ხედი ღრუბლებს ზემოთ")],
    includes: t("Hotel pickup, driver-guide, wine tasting, bridge & waterfall stops. Lunch at a village house on request.", "Трансфер от отеля, водитель-гид, дегустация вина, остановки у моста и водопадов. Обед в деревенском доме по запросу.", "სასტუმროდან წამოყვანა, მძღოლი-გიდი, ღვინის დეგუსტაცია, ხიდი და ჩანჩქერები. სადილი სოფლის სახლში სურვილისამებრ."),
    tag: t("Route #1 · most booked", "Маршрут №1 · самый популярный", "მარშრუტი №1 · ყველაზე პოპულარული"),
  },
  {
    id: "kutaisi", n: 2, region: "canyons", photo: "/images/tour-martvili.webp", price: 45, priceUnit: "pp",
    name: t("Martvili canyon, Prometheus cave & Kutaisi", "Каньон Мартвили, пещера Прометея и Кутаиси", "მარტვილის კანიონი, პრომეთეს მღვიმე და ქუთაისი"),
    duration: t("11–12 h", "11–12 ч", "11–12 სთ"),
    stops: [t("Boat ride in Martvili canyon", "Лодка по каньону Мартвили", "ნავით მარტვილის კანიონში"), t("Prometheus cave", "Пещера Прометея", "პრომეთეს მღვიმე"), t("Kinchkha waterfall & Balda canyon", "Водопад Кинчха и каньон Балда", "კინჩხას ჩანჩქერი და ბალდის კანიონი"), t("Kutaisi & Bagrati cathedral", "Кутаиси и храм Баграти", "ქუთაისი და ბაგრატის ტაძარი")],
    includes: t("Hotel pickup, driver-guide, all transfers between sites. Tickets for the boat and the cave are paid on site.", "Трансфер от отеля, водитель-гид, все переезды между объектами. Билеты на лодку и в пещеру оплачиваются на месте.", "სასტუმროდან წამოყვანა, მძღოლი-გიდი, ყველა გადაადგილება. ნავისა და მღვიმის ბილეთები ადგილზე."),
    tag: t("Route #2 · full day", "Маршрут №2 · целый день", "მარშრუტი №2 · მთელი დღე"),
  },
  {
    id: "batumi", n: 3, region: "city", photo: "/images/tour-gonio.webp", price: 25, priceUnit: "pp",
    name: t("Batumi city, Gonio fortress & the coast", "Батуми, крепость Гонио и побережье", "ბათუმი, გონიოს ციხე და სანაპირო"),
    duration: t("5–6 h", "5–6 ч", "5–6 სთ"),
    stops: [t("Gonio-Apsaros fortress", "Крепость Гонио-Апсарос", "გონიო-აფსაროსის ციხე"), t("Botanical garden", "Ботанический сад", "ბოტანიკური ბაღი"), t("Old Batumi & the boulevard", "Старый Батуми и бульвар", "ძველი ბათუმი და ბულვარი"), t("Boat trip at sunset", "Прогулка на катере на закате", "ნავით გასეირნება მზის ჩასვლისას")],
    includes: t("Driver-guide, hotel pickup, photo stops at the best viewpoints. Entrance tickets paid on site.", "Водитель-гид, трансфер от отеля, фотостопы на лучших видовых точках. Входные билеты на месте.", "მძღოლი-გიდი, სასტუმროდან წამოყვანა, ფოტო-გაჩერებები. ბილეთები ადგილზე."),
    tag: t("Route #3 · half day", "Маршрут №3 · полдня", "მარშრუტი №3 · ნახევარი დღე"),
  },
  {
    id: "highland", n: 4, region: "mountains", photo: "/images/tour-highland.webp", price: 45, priceUnit: "pp",
    name: t("Highland Adjara: Khulo & Goderdzi pass", "Высокогорная Аджария: Хуло и перевал Годердзи", "მაღალმთიანი აჭარა: ხულო და გოდერძის უღელტეხილი"),
    duration: t("10 h", "10 ч", "10 სთ"),
    stops: [t("Khulo cable car", "Канатная дорога в Хуло", "ხულოს საბაგირო"), t("Goderdzi pass, 2 025 m", "Перевал Годердзи, 2 025 м", "გოდერძის უღელტეხილი, 2 025 მ"), t("Green lake", "Зелёное озеро", "მწვანე ტბა"), t("Beshumi alpine meadows", "Альпийские луга Бешуми", "ბეშუმის ალპური მდელოები")],
    includes: t("4×4 vehicle, driver-guide, hotel pickup, home-cooked lunch in a mountain village.", "Внедорожник, водитель-гид, трансфер от отеля, домашний обед в горной деревне.", "4×4 მანქანა, მძღოლი-გიდი, სასტუმროდან წამოყვანა, სადილი მთის სოფელში."),
    tag: t("Route #4 · above the clouds", "Маршрут №4 · над облаками", "მარშრუტი №4 · ღრუბლებს ზემოთ"),
  },
  {
    id: "mtirala", n: 5, region: "mountains", photo: "/images/tour-forest.webp", price: 35, priceUnit: "pp",
    name: t("Mtirala national park & Chakvistavi", "Национальный парк Мтирала и Чаквистави", "მტირალას ეროვნული პარკი და ჩაქვისთავი"),
    duration: t("6–7 h", "6–7 ч", "6–7 სთ"),
    stops: [t("Rainforest trail", "Тропа через колхидский лес", "ბილიკი კოლხურ ტყეში"), t("Suspension bridge & waterfall", "Подвесной мост и водопад", "საკიდი ხიდი და ჩანჩქერი"), t("Zipline over the river", "Зиплайн над рекой", "ზიპლაინი მდინარეზე"), t("Lunch at a village guesthouse", "Обед в деревенском гестхаусе", "სადილი სოფლის სასტუმრო სახლში")],
    includes: t("Hotel pickup, driver-guide, park entrance. Zipline and lunch optional.", "Трансфер от отеля, водитель-гид, вход в парк. Зиплайн и обед по желанию.", "სასტუმროდან წამოყვანა, მძღოლი-გიდი, პარკის შესვლა. ზიპლაინი და სადილი სურვილით."),
  },
  {
    id: "adventure", n: 6, region: "canyons", photo: "/images/tour-river.webp", photoPos: "50% 40%", price: 60, priceUnit: "pp",
    name: t("Adventure day: ATV, rafting & zipline", "День адреналина: квадроциклы, рафтинг и зиплайн", "სათავგადასავლო დღე: ATV, რაფტინგი და ზიპლაინი"),
    duration: t("5 h", "5 ч", "5 სთ"),
    stops: [t("ATV ride through mountain villages", "Квадроциклы по горным деревням", "ATV მთის სოფლებში"), t("Rafting on the Acharistskali", "Рафтинг по Аджарисцкали", "რაფტინგი აჭარისწყალზე"), t("Zipline", "Зиплайн", "ზიპლაინი"), t("Buggy, karting or horse riding on request", "Багги, картинг или конная прогулка по запросу", "ბაგი, კარტინგი ან ცხენით სეირნობა სურვილით")],
    includes: t("All equipment and instructors, driver-guide, hotel pickup. Minimum age 12.", "Снаряжение и инструкторы, водитель-гид, трансфер от отеля. Возраст от 12 лет.", "აღჭურვილობა და ინსტრუქტორები, მძღოლი-გიდი, სასტუმროდან წამოყვანა. 12 წლიდან."),
    tag: t("New", "Новинка", "ახალი"),
  },
  {
    id: "georgia", n: 7, region: "multi", photo: "/images/tour-tbilisi.webp", price: 180, priceUnit: "day",
    name: t("Georgia in 3–5 days: Tbilisi, Kazbegi, Svaneti", "Грузия за 3–5 дней: Тбилиси, Казбеги, Сванетия", "საქართველო 3–5 დღეში: თბილისი, ყაზბეგი, სვანეთი"),
    duration: t("3–5 days", "3–5 дней", "3–5 დღე"),
    stops: [t("Tbilisi old town & Mtskheta", "Старый Тбилиси и Мцхета", "ძველი თბილისი და მცხეთა"), t("Gergeti trinity church, Kazbegi", "Гергети, Казбеги", "გერგეტის სამება, ყაზბეგი"), t("Mestia, Ushguli & Chalaadi glacier", "Местиа, Ушгули и ледник Чалаади", "მესტია, უშგული და ჩალაადის მყინვარი"), t("Borjomi & Vardzia on request", "Боржоми и Вардзия по запросу", "ბორჯომი და ვარძია სურვილით")],
    includes: t("Private car with driver-guide for the whole trip, route built around your dates. Hotels booked on request.", "Личный автомобиль с водителем-гидом на всю поездку, маршрут под ваши даты. Отели бронируем по запросу.", "კერძო მანქანა მძღოლ-გიდით მთელი მოგზაურობისთვის, მარშრუტი თქვენი თარიღების მიხედვით."),
    tag: t("Private only", "Только индивидуально", "მხოლოდ კერძო"),
  },
  {
    id: "transfer", n: 8, region: "multi", photo: "/images/tour-sea.webp", price: 60, priceUnit: "car",
    name: t("Private transfers: airports, Mestia, Tbilisi", "Трансферы: аэропорты, Местиа, Тбилиси", "ტრანსფერები: აეროპორტები, მესტია, თბილისი"),
    duration: t("2–8 h", "2–8 ч", "2–8 სთ"),
    stops: [t("Kutaisi airport ↔ Batumi, 2 h", "Аэропорт Кутаиси ↔ Батуми, 2 ч", "ქუთაისის აეროპორტი ↔ ბათუმი, 2 სთ"), t("Batumi → Mestia, 6 h with stops", "Батуми → Местиа, 6 ч с остановками", "ბათუმი → მესტია, 6 სთ"), t("Batumi → Tbilisi, 6 h", "Батуми → Тбилиси, 6 ч", "ბათუმი → თბილისი, 6 სთ"), t("Batumi airport ↔ hotel, any hour", "Аэропорт Батуми ↔ отель, в любое время", "ბათუმის აეროპორტი ↔ სასტუმრო, ნებისმიერ დროს")],
    includes: t("Comfortable car or minivan, meeting with a name sign, water on board, stops on the way on request.", "Комфортный автомобиль или минивэн, встреча с табличкой, вода в салоне, остановки по пути по запросу.", "კომფორტული მანქანა ან მინივენი, დახვედრა სახელის დაფით, წყალი, გაჩერებები სურვილით."),
  },
];

export type Review = { author: string; date: Text; text: Text; guide?: string };

const d = (en: string, ru: string, ka: string) => t(en, ru, ka);

export const reviews: Review[] = [
  {
    author: "Maia Pagava", guide: "Kevin", date: d("6 months ago", "6 месяцев назад", "6 თვის წინ"),
    text: t("We took a trip with Kevin, a day trip to the waterfalls and mountains of Adjara. He is a great guide and a caring person. Me and my friends were really lucky to meet him.", "Ездили с Кевином на однодневный тур по водопадам и горам Аджарии. Отличный гид и заботливый человек. Нам с друзьями очень повезло с ним познакомиться.", "კევინთან ერთად ვიმოგზაურეთ აჭარის ჩანჩქერებსა და მთებში. შესანიშნავი გიდი და მზრუნველი ადამიანი. მე და ჩემს მეგობრებს ნამდვილად გაგვიმართლა."),
  },
  {
    author: "Piyush Motwani", guide: "Kevin", date: d("a year ago", "год назад", "ერთი წლის წინ"),
    text: t("We did the 7-place tour with additional places as per request. Waterfalls, mountains, rivers, everything Adjara and Batumi has to offer. The most courteous and funny guide, small titbits, facts and hidden places. 10/10.", "Взяли тур по семи локациям плюс несколько мест по нашей просьбе. Водопады, горы, реки — всё, что есть в Аджарии и Батуми. Самый вежливый и весёлый гид, факты, истории и скрытые места. 10 из 10.", "7 ადგილის ტური ავიღეთ და დამატებით კიდევ რამდენიმე ჩვენი თხოვნით. ჩანჩქერები, მთები, მდინარეები — ყველაფერი, რაც აჭარასა და ბათუმს აქვს. ყველაზე თავაზიანი და მხიარული გიდი. 10/10."),
  },
  {
    author: "Amir Sharvit", guide: "Kevin", date: d("a year ago", "год назад", "ერთი წლის წინ"),
    text: t("Kevin is a gracious guide. The amount of knowledge that was imparted on the trip was amazing, pleasantly and with control over the small details. The vehicle is very comfortable. Definitely recommended.", "Кевин — очень тактичный гид. Объём знаний, который он дал за поездку, поражает, и всё это легко и с вниманием к мелочам. Машина очень комфортная. Однозначно рекомендую.", "კევინი თავაზიანი გიდია. ცოდნის რაოდენობა, რაც მოგზაურობისას გაგვიზიარა, საოცარია — სასიამოვნოდ და დეტალებზე ზრუნვით. მანქანა ძალიან კომფორტულია. ნამდვილად გირჩევთ."),
  },
  {
    author: "Barnali Banerjee", guide: "Kevin", date: d("a year ago", "год назад", "ერთი წლის წინ"),
    text: t("Memorable trip to Martvili canyon and Prometheus cave. Kevin arranged the trip for us at the very last moment and, as a gesture, dropped us at Batumi railway station afterwards.", "Незабываемая поездка в каньон Мартвили и пещеру Прометея. Кевин организовал тур в самый последний момент, а после ещё и отвёз нас на вокзал Батуми.", "დაუვიწყარი მოგზაურობა მარტვილის კანიონსა და პრომეთეს მღვიმეში. კევინმა ტური ბოლო წუთს მოგვიწყო და შემდეგ ბათუმის რკინიგზის სადგურამდეც მიგვიყვანა."),
  },
  {
    author: "Shania Othman", guide: "Kevin", date: d("2 years ago", "2 года назад", "2 წლის წინ"),
    text: t("The tour had so many places to see and experience. It's really worth the price as you get to do activities such as zipline or rafting. The restaurant we went to had amazing Georgian food.", "В туре столько мест, которые стоит увидеть и прочувствовать. Он точно стоит своих денег: в программе зиплайн и рафтинг. А в ресторане, куда нас привезли, была потрясающая грузинская еда.", "ტურში ამდენი სანახავი და განსაცდელი ადგილია. ფასად ნამდვილად ღირს — ზიპლაინი და რაფტინგიც შედის. რესტორანში, სადაც წაგვიყვანეს, საოცარი ქართული კერძები იყო."),
  },
  {
    author: "Nana Kalandadze", date: d("6 months ago", "6 месяцев назад", "6 თვის წინ"),
    text: t("Professional guide, the Batumi sightseeing tours were organised in a very professional way. Especially we liked the Highland Adjara mountain tour, Makhuntseti and Merisi waterfalls. The home-visit master class was super.", "Профессиональный гид, экскурсии по Батуми организованы на высшем уровне. Особенно понравился тур по высокогорной Аджарии, водопады Махунцети и Мериси. Мастер-класс в гостях у местной семьи — супер.", "პროფესიონალი გიდი, ბათუმის ტურები ძალიან პროფესიონალურად იყო ორგანიზებული. განსაკუთრებით მოგვეწონა მაღალმთიანი აჭარის ტური, მახუნცეთისა და მერისის ჩანჩქერები. ოჯახში მასტერკლასი — სუპერ."),
  },
  {
    author: "Gaurav G", guide: "Kevin", date: d("a year ago", "год назад", "ერთი წლის წინ"),
    text: t("Kevin, our driver cum guide cum photographer, gave us the best experience in Batumi on our day trip. Humble, knowledgeable and of course a superb photographer. He showed us the best viewpoints.", "Кевин — наш водитель, гид и фотограф в одном лице — подарил нам лучший день в Батуми. Скромный, знающий и, конечно, отличный фотограф. Показал нам лучшие видовые точки.", "კევინმა — ჩვენმა მძღოლმა, გიდმა და ფოტოგრაფმა — საუკეთესო დღე გვაჩუქა ბათუმში. თავმდაბალი, მცოდნე და შესანიშნავი ფოტოგრაფი. საუკეთესო ხედები გვაჩვენა."),
  },
  {
    author: "Sharan Dayanandan", guide: "Danis", date: d("a year ago", "год назад", "ერთი წლის წინ"),
    text: t("Danis was an excellent guide! He took us to additional spots beyond the planned itinerary. The car was comfortable, and we even got to explore a hidden wine cellar — such a memorable experience.", "Данис — отличный гид! Показал нам места сверх запланированного маршрута. Машина комфортная, а ещё мы попали в скрытый винный погреб — незабываемо.", "დანისი შესანიშნავი გიდი იყო! დაგეგმილ მარშრუტს დამატებითი ადგილებიც დაუმატა. მანქანა კომფორტული იყო და ფარული ღვინის მარანიც ვნახეთ — დაუვიწყარია."),
  },
  {
    author: "Mohammed Shehada", date: d("2 years ago", "2 года назад", "2 წლის წინ"),
    text: t("Amazing 3-day adventure to a number of hidden gems. Tours to places many tour guides don't know about. Well recommended.", "Потрясающее трёхдневное приключение по скрытым жемчужинам. Места, о которых многие гиды даже не знают. Рекомендую.", "საოცარი 3-დღიანი თავგადასავალი ფარულ მარგალიტებში. ადგილები, რომლებიც ბევრმა გიდმა არც კი იცის. გირჩევთ."),
  },
  {
    author: "Nikita Goroshko", guide: "Kevin", date: d("3 years ago", "3 года назад", "3 წლის წინ"),
    text: t("We have been in the Gonio castle and we also visited Mirveti and Makhuntseti waterfalls. Kevin was telling us about the history of these places. A great guy, I really suggest his tours.", "Были в крепости Гонио, у водопадов Мирвети и Махунцети. Кевин рассказывал историю каждого места. Отличный человек, очень советую его туры.", "გონიოს ციხეში ვიყავით და მირვეთისა და მახუნცეთის ჩანჩქერებიც ვნახეთ. კევინი ამ ადგილების ისტორიას გვიყვებოდა. შესანიშნავი ადამიანია, ნამდვილად გირჩევთ მის ტურებს."),
  },
];

export const gallery: { src: string; w: number; h: number }[] = [
  { src: "/images/tour-canyon.webp", w: 1000, h: 1333 },
  { src: "/images/tour-cave.webp", w: 1200, h: 900 },
  { src: "/images/tour-kutaisi.webp", w: 1200, h: 900 },
  { src: "/images/tour-waterfalls.webp", w: 1000, h: 1333 },
  { src: "/images/tour-field.webp", w: 1200, h: 800 },
  { src: "/images/tour-sunset.webp", w: 900, h: 1200 },
  { src: "/images/tour-city.webp", w: 1200, h: 900 },
  { src: "/images/tour-steam.webp", w: 900, h: 1600 },
  { src: "/images/tour-gonio.webp", w: 1200, h: 800 },
  { src: "/images/tour-cave-red.webp", w: 1200, h: 900 },
  { src: "/images/tour-street.webp", w: 900, h: 1200 },
  { src: "/images/tour-tbilisi.webp", w: 1200, h: 900 },
  { src: "/images/tour-martvili.webp", w: 1000, h: 1333 },
  { src: "/images/tour-highland.webp", w: 1200, h: 800 },
  { src: "/images/tour-sea.webp", w: 1200, h: 675 },
  { src: "/images/tour-souvenirs.webp", w: 800, h: 1422 },
  { src: "/images/tour-forest.webp", w: 1200, h: 800 },
  { src: "/images/tour-tank.webp", w: 1200, h: 540 },
];
