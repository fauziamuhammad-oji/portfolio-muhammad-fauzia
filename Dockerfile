# Gunakan Node.js versi ringan sebagai base image
FROM node:20-alpine

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependensi produksi saja agar image lebih kecil
# Jika ingin install semua dependensi (termasuk devDependencies), gunakan npm install
RUN npm ci --omit=dev

# Salin semua file dari proyek ke dalam container (kecuali yang ada di .dockerignore)
COPY . .

# Ekspos port yang digunakan oleh server Express (default 3001 berdasarkan server.js)
EXPOSE 3001

# Jalankan aplikasi menggunakan script start dari package.json (node server.js)
CMD ["npm", "start"]
