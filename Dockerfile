# Gunakan base image Node.js Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua kode ke dalam container
COPY . .

# Pastikan `.env` tersedia di container
COPY .env ./

# Ekspos port sesuai environment
EXPOSE ${PORT}

# Jalankan perintah dari package.json
CMD ["npm", "run", "start"]
