# Project Test Coding Inosoft (Frontend Developer)

Instalasi Backend (Laravel)
1. Tentukan Lokasi File
2. Clone Project
3. Install Vendor pada project try: Composer Install
4. Setting ENV seperti yang sudah disediakan pada file .env.example
5. Generate Key try: php artisan key:generate
6. Run Project try: Php artisan serv

Terdapat 3 Fungsi untuk memanggil array dummy data yang dipersiapkan (getCurrency, getUom, getCharge)
1. localhost:8000/api/backend/getCurrency (Untuk mengambil data Currency dan di fech pada select Currency pada frontend)
2. localhost:8000/api/backend/getUom (Untuk mengambil data Uom dan di fech pada select Uom pada frontend)
3. localhost:8000/api/backend/getCharge (Untuk mengambil data ChargeTo dan di fech pada select ChargeTo pada frontend)

Instalasi Frontend (Vue.Js v.2)
1. Tentukan Lokasi File
2. Clone Project
3. npm install
4. run project : npm run serve
5. Pastikan sudah melakukan command php artisan serv untuk mengambil data pada backend

