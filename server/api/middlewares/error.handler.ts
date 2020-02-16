import { Request, Response, ErrorRequestHandler } from 'express';

// export type ErrorRequestHandler<P extends Params = ParamsDictionary> = (err: any, req: Request<P>, res: Response, next: NextFunction) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response): void => {
	const errors = err.errors || [{ message: err.message }];
	res.status(err.status || 500).json({ errors });
};
export default errorHandler;
