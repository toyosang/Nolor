# Nolor - Web Chat Application

Nolor هو تطبيق دردشة ويب بسيط وفعال يسمح لك بإنشاء غرف محادثة برمز مخصص والتواصل مع الآخرين في الوقت الفعلي.

## المميزات ✨

- ✅ إنشاء غرف محادثة برمز مخصص
- ✅ دخول الغرف عبر الكود
- ✅ أسماء مستخدم عشوائية مع إمكانية التعديل
- ✅ حذف الرسائل الخاصة بك
- ✅ إرسال الصور والرموز التعبيرية (Emoji)
- ✅ عداد المستخدمين في الغرفة
- ✅ التواصل في الوقت الفعلي عبر WebSocket

## التكنولوجيا المستخدمة 🛠️

- **Frontend**: React, Socket.io-client
- **Backend**: Node.js, Express, Socket.io
- **Real-time**: WebSocket
- **Tools**: UUID للأكواد العشوائية

## البدء السريع 🚀

### المتطلبات
- Node.js v14 أو أعلى
- npm أو yarn

### التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/toyosang/Nolor.git
cd Nolor

# تثبيت المكتبات
npm install

# تثبيت مكتبات Frontend
cd client
npm install
cd ..
```

### تشغيل التطبيق

```bash
# تشغيل الـ Backend
npm start

# في نافذة طرفية أخرى، تشغيل الـ Frontend
npm run client
```

يفتح التطبيق على `http://localhost:3000`

## كيفية الاستخدام 📖

1. **الصفحة الرئيسية**:
   - اضغط "إنشاء غرفة" وأدخل الكود الذي تريده
   - أو اضغط "دخول الغرفة" وأدخل كود موجود

2. **داخل الغرفة**:
   - غيّر اسمك بالضغط على اسمك الحالي
   - أرسل رسائل نصية
   - أرسل صور ورموز تعبيرية
   - احذف رسائلك الخاصة
   - شاهد عدد المستخدمين المتصلين

## بنية المشروع 📁

```
Nolor/
├── server/
│   ├── index.js           # نقطة البداية للـ Backend
│   └── socket-handlers.js # معالجات Socket.io
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.jsx
│   │   │   └── ChatRoom.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
├── package.json
└── README.md
```

## المساهمة 🤝

يمكنك المساهمة بإضافة مميزات جديدة أو إصلاح الأخطاء. يرجى فتح Pull Request.

## الترخيص 📄

هذا المشروع مرخص تحت MIT License.
