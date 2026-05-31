# Etap 1: Budowanie (Build Stage)
FROM node:26-alpine AS build
WORKDIR /app
COPY ./app/package*.json ./
RUN npm install
COPY ./app .
RUN npm run build 

# Etap 2: Serwowanie (Production Stage)
FROM nginx:alpine
# Vite domyślnie buduje do folderu 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]