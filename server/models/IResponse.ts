import { BaseInterface } from './BaseInterface';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IResponse {
	result: boolean;
	message?: string;
	code?: string;
	model?: BaseInterface;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	jsonData?: any;
}
