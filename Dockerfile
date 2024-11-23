# Stage 1
FROM node:18 as client
WORKDIR /app
COPY . ./
RUN npm install

ARG VITE_SUPABASE_KEY
RUN echo $VITE_SUPABASE_KEY

RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=client /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]