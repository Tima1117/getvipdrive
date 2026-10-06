"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { tours, regions, reviews, type Lang, type Region } from "./data";
import { HeroInk, type HeroCopy } from "./hero-ink";
import { DaySection, type DayCopy } from "./day-section";
import { GallerySlider } from "./gallery-slider";

const phone = "+995599992980";
const phonePretty = "+995 599 99 29 80";
const waBase = "https://wa.me/995599992980";
const instagram = "https://www.instagram.com/getvipdrivetours/";
const email = "getvipdrivetours@gmail.com";
const facebook = "https://www.facebook.com/getvipdrivetours/";
const youtube = "https://www.youtube.com/@getvipdrivetours";
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=GET+VIP+DRIVE+TOURS+Batumi&query_place_id=ChIJi9UmuCaHZ0AR4a2lr8yvpsE";
const reviewsUrl = "https://www.google.com/maps/place/GET+VIP+DRIVE+TOURS/data=!4m7!3m6!1s0x40678726b826d58b:0xc1a6afccafa5ade1!8m2!3d41.6429314!4d41.6283164!16s%2Fg%2F11rrprkks9!19sChIJi9UmuCaHZ0AR4a2lr8yvpsE";
const mapEmbed = "https://www.openstreetmap.org/export/embed.html?bbox=41.6203%2C41.6389%2C41.6363%2C41.6469&layer=mapnik&marker=41.6429%2C41.6283";

const copy = {
  en: {
    nav: ["Routes", "Your day", "Reviews", "Gallery", "Contacts"],
    cta: "WhatsApp",
    hero: {
      eyebrow: "Private & group day tours from Batumi · since 2016",
      title: ["Wipe the fog off", "Georgia."],
      lede: "Waterfalls, canyons, caves and villages above the clouds, one day at a time. Hotel pickup, a driver-guide who also takes your photos, no hidden costs.",
      cta: "Plan my day in WhatsApp",
      cta2: "See the routes",
      hint: "Move your cursor across the page to reveal the view",
      hintTouch: "Drag your finger across the page to reveal the view",
      rating: "511 reviews on Google",
      pins: ["Martvili canyon", "Prometheus cave", "Goderdzi pass"],
    } as HeroCopy,
    strip: ["5.0 on Google · 511 reviews", "8 routes from Batumi", "Pickup at any hotel", "Guides speak EN · RU · KA · HE", "Your photos are included", "Daily departures 07:00–22:00"],
    toursEyebrow: "Routes",
    toursTitle: "Choose your day",
    toursLede: "Eight routes we drive every week. Join a small group or take a private car; pickup from any hotel in Batumi.",
    from: "from",
    pp: "/ person",
    car: "/ car",
    day: "/ day",
    book: "Book in WhatsApp",
    details: "Route details",
    hide: "Hide details",
    stopsLabel: "Stops",
    includesLabel: "Included",
    priceNote: "Prices are indicative and depend on the season and group size. The final price is confirmed in WhatsApp before you pay anything.",
    day_: {
      eyebrow: "How a day goes",
      title: "One day with us",
      lede: "Route #1, the way our guests describe it in more than a hundred reviews.",
      stops: [
        { time: "09:00", title: "Pickup at your hotel", text: "A comfortable car, water on board, the plan for the day already agreed in the chat." },
        { time: "10:30", title: "Makhuntseti waterfall & Queen Tamar bridge", text: "Twenty minutes by the water, then the 12th-century stone arch you can walk across." },
        { time: "12:00", title: "Mirveti waterfall walk", text: "A short forest trail to the quiet waterfall that most tours skip." },
        { time: "13:30", title: "Keda family winery", text: "Homemade wine, khachapuri from the oven and a cooking master class if you like." },
        { time: "15:30", title: "Above the clouds", text: "The highland viewpoint, the photo everyone takes home." },
        { time: "18:30", title: "Back in Batumi", text: "With a couple of hundred photos Kevin took of you along the way." },
      ],
      facts: [
        { b: "Guide and photographer", s: "Kevin shoots every stop. The photos are yours." },
        { b: "No hidden costs", s: "The price in the chat is the price you pay." },
        { b: "Extra stops on request", s: "Ask for a place, we add it to the route." },
      ],
      cta: "Ask about this route",
    } as DayCopy,
    revEyebrow: "Reviews",
    revTitle: "511 five-star reviews",
    revLede: "Every one of the latest hundred reviews on Google is five stars. Here are a few of them.",
    revAll: "Read all reviews on Google",
    guide: "Guide",
    galEyebrow: "Gallery",
    galTitle: "Where we will take you",
    galLede: "Photos from our tours. Hover to pause, click to open.",
    conEyebrow: "Contacts",
    conTitle: "Plan your day",
    addrLabel: "Office",
    addr: "Selim Khimshiashvili St 20, Batumi · we pick you up at your hotel",
    phoneLabel: "Phone / WhatsApp",
    hoursLabel: "Hours",
    hours: "Daily 07:00–22:00",
    call: "Call",
    directions: "Directions",
    bookTitle: "Request a tour",
    bookText: "Choose a route and a date. We confirm availability and the price in WhatsApp, usually within an hour.",
    fName: "Your name",
    fTour: "Route",
    fAny: "Help me choose",
    fDate: "Date",
    fPeople: "People",
    send: "Send to WhatsApp",
    bookNote: "No prepayment. The button opens WhatsApp with a ready message.",
    waMsg: (tour: string, date: string, people: string, name: string) => `Hello! I'd like to book a tour: ${tour}. Date: ${date || "flexible"}. People: ${people || "?"}. ${name ? `My name is ${name}.` : ""}`,
    waTour: (tour: string) => `Hello! I'm interested in the "${tour}" route. Which dates are available?`,
    waHero: "Hello! I'm in Batumi and would like to plan a day tour. Can you help me choose a route?",
    foot: "© 2026 GET VIP DRIVE TOURS · Batumi, Georgia",
    credit: "Photos from the agency's Google Maps and Instagram",
  },
  ru: {
    nav: ["Маршруты", "Ваш день", "Отзывы", "Галерея", "Контакты"],
    cta: "WhatsApp",
    hero: {
      eyebrow: "Индивидуальные и групповые туры из Батуми · с 2016 года",
      title: ["Сотрите туман", "с Грузии."],
      lede: "Водопады, каньоны, пещеры и деревни над облаками, по одному дню за раз. Трансфер от отеля, водитель-гид, который ещё и фотографирует вас, без скрытых доплат.",
      cta: "Спланировать день в WhatsApp",
      cta2: "Смотреть маршруты",
      hint: "Проведите курсором по странице, чтобы открыть вид",
      hintTouch: "Проведите пальцем по странице, чтобы открыть вид",
      rating: "511 отзывов в Google",
      pins: ["Каньон Мартвили", "Пещера Прометея", "Перевал Годердзи"],
    } as HeroCopy,
    strip: ["5.0 в Google · 511 отзывов", "8 маршрутов из Батуми", "Забираем из любого отеля", "Гиды говорят на EN · RU · KA · HE", "Ваши фото включены", "Выезды ежедневно 07:00–22:00"],
    toursEyebrow: "Маршруты",
    toursTitle: "Выберите свой день",
    toursLede: "Восемь маршрутов, по которым мы ездим каждую неделю. В небольшой группе или на личном автомобиле; забираем из любого отеля Батуми.",
    from: "от",
    pp: "/ чел.",
    car: "/ машина",
    day: "/ день",
    book: "Забронировать в WhatsApp",
    details: "Подробнее о маршруте",
    hide: "Скрыть",
    stopsLabel: "Остановки",
    includesLabel: "Включено",
    priceNote: "Цены ориентировочные и зависят от сезона и размера группы. Итоговую стоимость подтверждаем в WhatsApp до любой оплаты.",
    day_: {
      eyebrow: "Как проходит день",
      title: "Один день с нами",
      lede: "Маршрут №1 таким, каким его описывают гости в сотне отзывов.",
      stops: [
        { time: "09:00", title: "Забираем из отеля", text: "Комфортная машина, вода в салоне, план дня уже согласован в чате." },
        { time: "10:30", title: "Водопад Махунцети и мост царицы Тамары", text: "Двадцать минут у воды, затем каменная арка XII века, по которой можно пройти." },
        { time: "12:00", title: "Прогулка к водопаду Мирвети", text: "Короткая лесная тропа к тихому водопаду, который большинство туров пропускает." },
        { time: "13:30", title: "Семейная винодельня в Кеде", text: "Домашнее вино, хачапури из печи и мастер-класс по желанию." },
        { time: "15:30", title: "Над облаками", text: "Высокогорная смотровая, та самая фотография, которую все увозят домой." },
        { time: "18:30", title: "Снова в Батуми", text: "С парой сотен фотографий, которые Кевин сделал по дороге." },
      ],
      facts: [
        { b: "Гид и фотограф", s: "Кевин снимает на каждой остановке. Фото — ваши." },
        { b: "Без скрытых доплат", s: "Цена в чате — это цена, которую вы платите." },
        { b: "Остановки по запросу", s: "Назовите место, и мы добавим его в маршрут." },
      ],
      cta: "Спросить про этот маршрут",
    } as DayCopy,
    revEyebrow: "Отзывы",
    revTitle: "511 отзывов на пять звёзд",
    revLede: "Каждый из последних ста отзывов в Google — пять звёзд. Вот некоторые из них.",
    revAll: "Все отзывы в Google",
    guide: "Гид",
    galEyebrow: "Галерея",
    galTitle: "Куда мы вас отвезём",
    galLede: "Фотографии с наших туров. Наведите, чтобы остановить, нажмите, чтобы открыть.",
    conEyebrow: "Контакты",
    conTitle: "Спланируйте свой день",
    addrLabel: "Офис",
    addr: "ул. Селима Химшиашвили 20, Батуми · забираем из вашего отеля",
    phoneLabel: "Телефон / WhatsApp",
    hoursLabel: "Часы",
    hours: "Ежедневно 07:00–22:00",
    call: "Позвонить",
    directions: "Маршрут",
    bookTitle: "Заявка на тур",
    bookText: "Выберите маршрут и дату. Подтвердим наличие мест и цену в WhatsApp, обычно в течение часа.",
    fName: "Ваше имя",
    fTour: "Маршрут",
    fAny: "Помогите выбрать",
    fDate: "Дата",
    fPeople: "Человек",
    send: "Отправить в WhatsApp",
    bookNote: "Без предоплаты. Кнопка откроет WhatsApp с готовым сообщением.",
    waMsg: (tour: string, date: string, people: string, name: string) => `Здравствуйте! Хочу забронировать тур: ${tour}. Дата: ${date || "гибко"}. Человек: ${people || "?"}. ${name ? `Меня зовут ${name}.` : ""}`,
    waTour: (tour: string) => `Здравствуйте! Интересует маршрут «${tour}». Какие даты свободны?`,
    waHero: "Здравствуйте! Я в Батуми и хочу спланировать однодневный тур. Поможете выбрать маршрут?",
    foot: "© 2026 GET VIP DRIVE TOURS · Батуми, Грузия",
    credit: "Фото из Google Maps и Instagram агентства",
  },
  ka: {
    nav: ["მარშრუტები", "თქვენი დღე", "შეფასებები", "გალერეა", "კონტაქტი"],
    cta: "WhatsApp",
    hero: {
      eyebrow: "კერძო და ჯგუფური ერთდღიანი ტურები ბათუმიდან · 2016 წლიდან",
      title: ["მოაშორეთ ნისლი", "საქართველოს."],
      lede: "ჩანჩქერები, კანიონები, მღვიმეები და სოფლები ღრუბლებს ზემოთ, თითო დღეში. სასტუმროდან წამოყვანა, მძღოლი-გიდი, რომელიც თქვენც გადაგიღებთ, ფარული ხარჯების გარეშე.",
      cta: "დღის დაგეგმვა WhatsApp-ში",
      cta2: "მარშრუტების ნახვა",
      hint: "გაატარეთ კურსორი გვერდზე, რომ ხედი გამოჩნდეს",
      hintTouch: "გაატარეთ თითი გვერდზე, რომ ხედი გამოჩნდეს",
      rating: "511 შეფასება Google-ზე",
      pins: ["მარტვილის კანიონი", "პრომეთეს მღვიმე", "გოდერძის უღელტეხილი"],
    } as HeroCopy,
    strip: ["5.0 Google-ზე · 511 შეფასება", "8 მარშრუტი ბათუმიდან", "წამოყვანა ნებისმიერი სასტუმროდან", "გიდები საუბრობენ EN · RU · KA · HE", "თქვენი ფოტოები შედის", "ყოველდღე 07:00–22:00"],
    toursEyebrow: "მარშრუტები",
    toursTitle: "აირჩიეთ თქვენი დღე",
    toursLede: "რვა მარშრუტი, რომლითაც ყოველ კვირა დავდივართ. მცირე ჯგუფში ან კერძო მანქანით; წამოყვანა ბათუმის ნებისმიერი სასტუმროდან.",
    from: "-დან",
    pp: "/ ადამიანი",
    car: "/ მანქანა",
    day: "/ დღე",
    book: "დაჯავშნა WhatsApp-ში",
    details: "მარშრუტის დეტალები",
    hide: "დამალვა",
    stopsLabel: "გაჩერებები",
    includesLabel: "შედის",
    priceNote: "ფასები სავარაუდოა და დამოკიდებულია სეზონსა და ჯგუფის ზომაზე. საბოლოო ფასს WhatsApp-ში ვადასტურებთ გადახდამდე.",
    day_: {
      eyebrow: "როგორ გადის დღე",
      title: "ერთი დღე ჩვენთან",
      lede: "მარშრუტი №1 ისე, როგორც მას სტუმრები ასობით შეფასებაში აღწერენ.",
      stops: [
        { time: "09:00", title: "წამოყვანა სასტუმროდან", text: "კომფორტული მანქანა, წყალი, დღის გეგმა უკვე ჩატში შეთანხმებული." },
        { time: "10:30", title: "მახუნცეთის ჩანჩქერი და თამარ მეფის ხიდი", text: "ოცი წუთი წყალთან, შემდეგ XII საუკუნის ქვის თაღი, რომელზეც შეგიძლიათ გაიაროთ." },
        { time: "12:00", title: "მირვეთის ჩანჩქერი", text: "მოკლე ტყის ბილიკი წყნარ ჩანჩქერამდე, რომელსაც ტურების უმეტესობა გამოტოვებს." },
        { time: "13:30", title: "ოჯახური მარანი ქედაში", text: "სახლის ღვინო, ღუმელის ხაჭაპური და მასტერკლასი სურვილისამებრ." },
        { time: "15:30", title: "ღრუბლებს ზემოთ", text: "მაღალმთიანი ხედი, ის ფოტო, რომელსაც ყველა სახლში მიაქვს." },
        { time: "18:30", title: "ისევ ბათუმში", text: "რამდენიმე ასეული ფოტოთი, რომელიც კევინმა გზაში გადაგიღოთ." },
      ],
      facts: [
        { b: "გიდი და ფოტოგრაფი", s: "კევინი ყველა გაჩერებაზე იღებს. ფოტოები თქვენია." },
        { b: "ფარული ხარჯების გარეშე", s: "ჩატში დასახელებული ფასი საბოლოოა." },
        { b: "დამატებითი გაჩერებები", s: "დაასახელეთ ადგილი და მარშრუტს დავუმატებთ." },
      ],
      cta: "კითხვა ამ მარშრუტზე",
    } as DayCopy,
    revEyebrow: "შეფასებები",
    revTitle: "511 ხუთვარსკვლავიანი შეფასება",
    revLede: "ბოლო ასი შეფასებიდან Google-ზე ყველა ხუთვარსკვლავიანია. აქ რამდენიმეა.",
    revAll: "ყველა შეფასება Google-ზე",
    guide: "გიდი",
    galEyebrow: "გალერეა",
    galTitle: "სად წაგიყვანთ",
    galLede: "ფოტოები ჩვენი ტურებიდან. მიიტანეთ კურსორი გასაჩერებლად, დააჭირეთ გასახსნელად.",
    conEyebrow: "კონტაქტი",
    conTitle: "დაგეგმეთ თქვენი დღე",
    addrLabel: "ოფისი",
    addr: "სელიმ ხიმშიაშვილის ქ. 20, ბათუმი · წამოგიყვანთ თქვენი სასტუმროდან",
    phoneLabel: "ტელეფონი / WhatsApp",
    hoursLabel: "საათები",
    hours: "ყოველდღე 07:00–22:00",
    call: "დარეკვა",
    directions: "მარშრუტი",
    bookTitle: "ტურის მოთხოვნა",
    bookText: "აირჩიეთ მარშრუტი და თარიღი. ადგილებსა და ფასს WhatsApp-ში დავადასტურებთ, ჩვეულებრივ ერთ საათში.",
    fName: "თქვენი სახელი",
    fTour: "მარშრუტი",
    fAny: "დამეხმარეთ არჩევაში",
    fDate: "თარიღი",
    fPeople: "ადამიანი",
    send: "გაგზავნა WhatsApp-ში",
    bookNote: "წინასწარი გადახდის გარეშე. ღილაკი გახსნის WhatsApp-ს მზა შეტყობინებით.",
    waMsg: (tour: string, date: string, people: string, name: string) => `გამარჯობა! მინდა ტურის დაჯავშნა: ${tour}. თარიღი: ${date || "მოქნილი"}. ადამიანი: ${people || "?"}. ${name ? `მე ვარ ${name}.` : ""}`,
    waTour: (tour: string) => `გამარჯობა! მაინტერესებს მარშრუტი „${tour}“. რომელი თარიღებია თავისუფალი?`,
    waHero: "გამარჯობა! ბათუმში ვარ და მინდა ერთდღიანი ტურის დაგეგმვა. დამეხმარებით მარშრუტის არჩევაში?",
    foot: "© 2026 GET VIP DRIVE TOURS · ბათუმი, საქართველო",
    credit: "ფოტოები სააგენტოს Google Maps-იდან და Instagram-იდან",
  },
};
type Copy = typeof copy["en"];

const wa = (text: string) => `${waBase}?text=${encodeURIComponent(text)}`;

const Ico = {
  wa: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  ig: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></svg>,
  clockS: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
};

const Mark = () => (
  <svg viewBox="0 0 32 32" aria-hidden><path d="M5 22 L11 12 L15 18 L19 9 L27 22 Z" fill="#7fb069" /><path d="M5 22 L11 12 L15 18 L19 9 L27 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="23" cy="8" r="2.2" fill="#e8b043" /></svg>
);

function SmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    return () => lenis.destroy();
  }, [reduced]);
  return null;
}

function Tours({ lang, c }: { lang: Lang; c: Copy }) {
  const [region, setRegion] = useState<Region | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const list = region === "all" ? tours : tours.filter(x => x.region === region);
  const unit = (u: "pp" | "car" | "day") => (u === "pp" ? c.pp : u === "car" ? c.car : c.day);
  return (
    <section className="tours" id="tours">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{c.toursEyebrow}</p>
            <h2 className="section-title">{c.toursTitle}</h2>
          </div>
          <p className="section-lede">{c.toursLede}</p>
        </div>
        <div className="tabs" role="tablist">
          {regions.map(r => <button key={r.id} role="tab" aria-selected={region === r.id} className={region === r.id ? "active" : ""} onClick={() => setRegion(r.id)}>{r.label[lang]}</button>)}
        </div>
        <motion.div className="tour-grid" layout>
          <AnimatePresence mode="popLayout">
            {list.map((x, i) => {
              const open = openId === x.id;
              return (
                <motion.article key={x.id} className="tour-card" layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.45, delay: i * 0.05 }}>
                  <div className="tour-media">
                    <Image src={x.photo} alt={x.name[lang]} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: "cover", objectPosition: x.photoPos || "50% 50%" }} />
                    <span className="tour-n">{String(x.n).padStart(2, "0")}</span>
                    <span className="tour-dur">{Ico.clockS}{x.duration[lang]}</span>
                    {x.tag && <span className="tour-tag">{x.tag[lang]}</span>}
                  </div>
                  <div className="tour-body">
                    <h3>{x.name[lang]}</h3>
                    <p className="tour-stops">{x.stops.map(s => s[lang]).join(" · ")}</p>
                    <div className="tour-price">{lang === "ka" ? <><b>${x.price}</b><span>{c.from}</span><span>{unit(x.priceUnit)}</span></> : <><span>{c.from}</span><b>${x.price}</b><span>{unit(x.priceUnit)}</span></>}</div>
                    <div className="tour-actions">
                      <a className="btn btn-wa" href={wa(c.waTour(x.name[lang]))} target="_blank" rel="noopener noreferrer">{Ico.wa}{c.book}</a>
                      <button className="btn btn-line" onClick={() => setOpenId(open ? null : x.id)} aria-expanded={open}>{open ? c.hide : c.details}</button>
                    </div>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div className="tour-details" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                          <div>
                            <b>{c.stopsLabel}</b>
                            <ol>{x.stops.map(s => <li key={s.en}>{s[lang]}</li>)}</ol>
                            <b>{c.includesLabel}</b>
                            <p>{x.includes[lang]}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
        <p className="price-note">{c.priceNote}</p>
      </div>
    </section>
  );
}

function Reviews({ lang, c }: { lang: Lang; c: Copy }) {
  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <div className="rev-head">
          <div className="rev-score">
            <b>5.0</b>
            <div><span className="stars">★★★★★</span><span>{c.hero.rating}</span></div>
          </div>
          <div>
            <p className="eyebrow light">{c.revEyebrow}</p>
            <h2 className="section-title light">{c.revTitle}</h2>
            <p className="section-lede light">{c.revLede}</p>
            <a className="btn btn-paper" href={reviewsUrl} target="_blank" rel="noopener noreferrer">{c.revAll} ↗</a>
          </div>
        </div>
        <div className="rev-grid">
          {reviews.map((r, i) => (
            <motion.blockquote key={r.author} className="review" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}>
              <span className="review-quote">“</span>
              <p>{r.text[lang]}</p>
              <footer>
                <div><b>{r.author}</b><span>{r.date[lang]} · Google</span></div>
                {r.guide && <span className="review-guide">{c.guide}: {r.guide}</span>}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts({ lang, c }: { lang: Lang; c: Copy }) {
  const [name, setName] = useState("");
  const [tour, setTour] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("2");
  const msg = c.waMsg(tour || c.fAny, date, people, name);
  return (
    <section className="contacts" id="contacts">
      <div className="container">
        <div className="contacts-grid">
          <div>
            <p className="eyebrow">{c.conEyebrow}</p>
            <h2 className="section-title" style={{ marginBottom: 28 }}>{c.conTitle}</h2>
            <div className="contact-list">
              <div className="contact-row"><span className="c-ico">{Ico.pin}</span><div><b>{c.addrLabel}</b><a href={mapsUrl} target="_blank" rel="noopener noreferrer">{c.addr}</a></div></div>
              <div className="contact-row"><span className="c-ico">{Ico.phone}</span><div><b>{c.phoneLabel}</b><a href={`tel:${phone}`}>{phonePretty}</a></div></div>
              <div className="contact-row"><span className="c-ico">{Ico.clock}</span><div><b>{c.hoursLabel}</b><span>{c.hours}</span></div></div>
              <div className="contact-row"><span className="c-ico">{Ico.mail}</span><div><b>Email</b><a href={`mailto:${email}`}>{email}</a></div></div>
              <div className="contact-row"><span className="c-ico">{Ico.ig}</span><div><b>Social</b><span className="socials"><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a href={facebook} target="_blank" rel="noopener noreferrer">Facebook</a><a href={youtube} target="_blank" rel="noopener noreferrer">YouTube</a></span></div></div>
            </div>
            <div className="contact-actions">
              <a className="btn btn-wa" href={waBase} target="_blank" rel="noopener noreferrer">{Ico.wa}WhatsApp</a>
              <a className="btn btn-line" href={`tel:${phone}`}>{c.call}</a>
              <a className="btn btn-line" href={mapsUrl} target="_blank" rel="noopener noreferrer">{c.directions} ↗</a>
            </div>
          </div>
          <form className="book" onSubmit={e => { e.preventDefault(); window.open(wa(msg), "_blank", "noopener"); }}>
            <h3>{c.bookTitle}</h3>
            <p>{c.bookText}</p>
            <div className="book-grid">
              <div className="field full"><label htmlFor="f-name">{c.fName}</label><input id="f-name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" /></div>
              <div className="field full"><label htmlFor="f-tour">{c.fTour}</label>
                <select id="f-tour" value={tour} onChange={e => setTour(e.target.value)}>
                  <option value="">{c.fAny}</option>
                  {tours.map(x => <option key={x.id} value={x.name[lang]}>{String(x.n).padStart(2, "0")} · {x.name[lang]}</option>)}
                </select>
              </div>
              <div className="field"><label htmlFor="f-date">{c.fDate}</label><input id="f-date" type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
              <div className="field"><label htmlFor="f-people">{c.fPeople}</label><input id="f-people" type="number" min={1} max={30} value={people} onChange={e => setPeople(e.target.value)} /></div>
            </div>
            <button className="btn btn-wa" type="submit">{Ico.wa}{c.send}</button>
            <p className="book-note">{c.bookNote}</p>
          </form>
        </div>
      </div>
      <div className="map-wrap" data-lenis-prevent>
        <iframe src={mapEmbed} title="GET VIP DRIVE TOURS on the map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
    </section>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const c = copy[lang];
  const navIds = useMemo(() => ["tours", "day", "reviews", "gallery", "contacts"], []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      <SmoothScroll />
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="header-inner">
          <a className="brand" href="#top"><i><Mark /></i><span>GET VIP DRIVE<em>tours</em></span></a>
          <nav className={`nav${open ? " open" : ""}`}>
            {c.nav.map((label, i) => <a key={navIds[i]} href={`#${navIds[i]}`} onClick={() => setOpen(false)}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <div className="languages">
              {(["en", "ru", "ka"] as Lang[]).map(l => <button key={l} className={lang === l ? "active" : ""} onClick={() => { setLang(l); setOpen(false); }} aria-pressed={lang === l}>{l === "ka" ? "GE" : l.toUpperCase()}</button>)}
            </div>
            <a className="header-cta" href={wa(c.waHero)} target="_blank" rel="noopener noreferrer">{Ico.wa}<span>{c.cta}</span></a>
            <button className="mobile-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
          </div>
        </div>
      </header>

      <main>
        <HeroInk c={c.hero} wa={wa(c.waHero)} />

        <div className="strip" aria-hidden>
          <div className="strip-track">
            {[...c.strip, ...c.strip].map((s, i) => <span key={i}>{s}<i>◆</i></span>)}
          </div>
        </div>

        <Tours lang={lang} c={c} />
        <DaySection c={c.day_} wa={wa(c.waTour(tours[0].name[lang]))} />
        <Reviews lang={lang} c={c} />

        <section className="gallery" id="gallery">
          <div className="container section-head">
            <div>
              <p className="eyebrow">{c.galEyebrow}</p>
              <h2 className="section-title">{c.galTitle}</h2>
            </div>
            <p className="section-lede">{c.galLede}</p>
          </div>
          <GallerySlider onPhoto={setLightbox} />
        </section>

        <Contacts lang={lang} c={c} />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand" href="#top"><i><Mark /></i><span>GET VIP DRIVE<em>tours</em></span></a>
          <span>{c.foot} · {c.credit}</span>
          <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        </div>
      </footer>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setLightbox(null)}>
            <motion.div className="lightbox-img" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} transition={{ duration: 0.2 }} onClick={e => e.stopPropagation()}>
              <Image src={lightbox} alt="" fill style={{ objectFit: "contain" }} sizes="100vw" />
              <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
