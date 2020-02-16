import { IResponse } from '../../models/IResponse';
import { Constant } from '../../config/Constant';
import { User } from '../../models/User';
import { Branch } from '../../models/Branch';

export class AdminService {
	async selAcademyList(): Promise<IResponse> {
		const response: IResponse = {
			result: true,
			message: '',
		};
		return response;
	}

	async insAcademy(): Promise<IResponse> {
		const response: IResponse = {
			result: true,
			message: '',
		};
		return response;
	}

	async updAcademy(): Promise<IResponse> {
		const response: IResponse = {
			result: true,
			message: '',
		};
		return response;
	}

	async delAcademy(): Promise<IResponse> {
		const response: IResponse = {
			result: true,
			message: '',
		};
		return response;
	}

	async selBranchList(academyId: number): Promise<IResponse> {
		const branchList = await Branch.findAll({
			attributes: ['branchId', 'academyId', 'name', 'status'],
			where: { academyId },
			include: [
				{
					attributes: ['userId', 'name'],
					model: User,
					required: true,
				},
			],
		}).catch(Constant.returnDbErrorResponse);

		const response: IResponse = {
			result: true,
			model: branchList,
		};
		return response;
	}

	async insBranch(): Promise<IResponse> {
		const response: IResponse = {
			result: true,
			message: '',
		};
		return response;
	}

	async updBranch(): Promise<IResponse> {
		const response: IResponse = {
			result: true,
			message: '',
		};
		return response;
	}

	async delBranch(): Promise<IResponse> {
		const response: IResponse = {
			result: true,
			message: '',
		};
		return response;
	}
}

export default new AdminService();
