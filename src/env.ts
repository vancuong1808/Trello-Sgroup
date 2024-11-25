import dotenv from 'dotenv'
dotenv.config();

export const envServer : {
    PORT: string | number,
    SECRET_KEY: string
} = {
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || ""
}

export const envDataBase : {
    HOST: string,
    PORT: number,
    USERNAME: string,
    PASSWORD: string,
    DATABASE: string
} = {
    HOST: process.env.DB_HOST || "",
    PORT: Number( process.env.DB_PORT || "3306" ) || 3306,
    USERNAME: process.env.DB_USERNAME || "",
    PASSWORD: process.env.DB_PASSWORD || "",
    DATABASE: process.env.DB_NAME || ""
}

export const envCloudinary : {
    CLOUD_NAME: string,
    API_KEY: string,
    API_SECRET: string
} = {
    CLOUD_NAME: process.env.CLOUDINARY_NAME || "",
    API_KEY: process.env.CLOUDINARY_API_KEY || "",
    API_SECRET: process.env.CLOUDINARY_API_SECRET || ""
}

