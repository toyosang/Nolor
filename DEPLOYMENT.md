# نشر Nolor على GitHub Pages 🚀

## الخطوات للنشر على GitHub Pages:

### 1️⃣ تثبيت gh-pages
```bash
cd client
npm install --save-dev gh-pages
cd ..
```

### 2️⃣ بناء المشروع
```bash
cd client
npm run build
cd ..
```

### 3️⃣ نشر الموقع
```bash
cd client
npm run deploy
cd ..
```

### ✅ تحقق من الموقع:
الموقع سيكون متاح على: **https://toyosang.github.io/Nolor**

---

## ملاحظات مهمة:

⚠️ **التطبيق الحالي يحتاج الـ Backend:**
- الدردشة تحتاج خادم Node.js يعمل
- GitHub Pages تستضيف الـ Frontend فقط
- لن تعمل الدردشة بشكل كامل بدون Backend

### الحل:
**نشر Backend على منصة مثل:**
- Heroku
- Render
- Railway
- Replit

ثم تحديث رابط الاتصال في `ChatRoom.jsx`:
```javascript
const newSocket = io('https://your-backend-url.com');
```

---

## خطوات كاملة (Frontend + Backend):

### نشر Frontend على GitHub Pages:
```bash
cd client
npm run build
npm run deploy
```

### نشر Backend على Render:
1. روح https://render.com
2. اختر "New Web Service"
3. ربط المستودع
4. اختر "Node" environment
5. أضف الأوامر:
   - Build: `npm install`
   - Start: `npm start`

ثم استخدم رابط Render في الـ Frontend 🎉
