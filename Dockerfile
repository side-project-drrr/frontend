FROM node:18.10.0

WORKDIR /app

COPY dist /app/dist

RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]