# Math.random-interactive-game-web-
# 🎲 Algoritma Bet | Şansını Kodla!

> **"Kasa her zaman kazanır... ama bu sefer kasa sadece bir algoritma!"**

Bu proje, dışarıdan bakıldığında bir şans oyunları sitesi gibi görünse de, aslında **JavaScript'in `Math.random()` kütüphanesinin çalışma mantığını** ve temel **olasılık algoritmalarını** eğlenceli bir yolla anlatan interaktif bir web simülasyonudur.

Gerçek para yok, risk yok; sadece **kod ve mantık** var.

## 🎯 Projenin Amacı
Kullanıcılara (ve geliştiricilere), bilgisayarların "rastgele" sayıları nasıl ürettiğini, `if-else` bloklarıyla olasılıkların nasıl yönetildiğini ve basit bir bakiye sisteminin *state management* (durum yönetimi) mantığını göstermektir.

## 🚀 Özellikler & Oyunlar

Sitede üç farklı algoritma simülasyonu bulunur:

1.  **Sayısal Loto (1-49):** Diziler (Arrays) ve döngüler kullanılarak, mükerrer (tekrarlayan) sayıların engellendiği bir çekiliş simülasyonu.
2.  **Yazı / Tura:** `%50 - %50` olasılık mantığının en basit hali.
3.  **Zar Atımı:** İki bağımsız değişkenin toplamına dayalı olasılık dağılımı (Çan eğrisi mantığına giriş).
4.  **Dinamik Bakiye Sistemi:** Kazanılan ve kaybedilen sanal paraların anlık takibi.
5.  **Bootstrap 5 Arayüzü:** Responsive (mobil uyumlu) ve modern karanlık mod tasarımı.

## 🛠️ Kullanılan Teknolojiler

* **HTML5:** İskelet yapı.
* **CSS3 (Bootstrap 5):** Stil, düzen ve "Dark Theme" renk paleti.
* **JavaScript (Vanilla):** Tüm oyun mantığı, DOM manipülasyonu ve `Math` kütüphanesi fonksiyonları.

## 💻 Nasıl Çalışır? (Kodun Arkasındaki Mantık)

Sitedeki tüm "şans" faktörü aslında şu basit satıra dayanır:

```javascript
Math.random(); // 0 ile 1 arasında (0 dahil, 1 hariç) rastgele ondalıklı sayı üretir.
Örneğin, 1 ile 49 arasında rastgele bir tam sayı üretmek için kullandığımız algoritma şöyledir:

JavaScript
let rastgeleSayi = Math.floor(Math.random() * 49) + 1;
Bu proje, bu basit matematiksel formülün, kullanıcı arayüzünde nasıl heyecanlı bir oyuna dönüştürülebileceğini kanıtlar.

📦 Kurulum
Bu projeyi bilgisayarınızda çalıştırmak için herhangi bir sunucu kurulumuna gerek yoktur.

Repoyu klonlayın veya ZIP olarak indirin.

Klasörün içindeki index.html dosyasına çift tıklayın.

Tarayıcınızda açılan simülasyonun keyfini çıkarın!

⚠️ Yasal Uyarı (Disclaimer)
Bu proje tamamen EĞİTİM ve MİZAH amaçlıdır. Sitede geçen paralar, bahisler ve kazançlar tamamen sanaldır. Gerçek para ile oynanan kumarı teşvik etmez, sadece yazılım algoritmalarını simüle eder. Bağımlılık yapmaz, kodlama sevgisi yapar. 😉

 🚀 Canlı Deneyim
[Canlı Demo: Algoritma Bet](https://algolotokazandirir.netlify.app/)

Developed by [UMİTTCNR]
