declare global {
  namespace Express {
    export interface Request {
      files: Express.Multer.File[];
    }
  }
}

export {};
