import { IResponse } from '../../models/IResponse';
import { CdGrp, CdDtl } from '../../models/Code';
import { sequelize } from '../../common/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

class CodeService {
  async selGroupCodeList(academyId: number): Promise<IResponse> {
    const grpCdList = await CdGrp.findAll({
      attributes: ['grpId', 'grpCd', 'grpCdName', 'status', [Sequelize.literal('(SELECT COUNT(dtl_id) FROM CD_DTL WHERE CD_DTL.ACADEMY_ID = CD_GRP.ACADEMY_ID AND CD_DTL.GRP_CD = CD_GRP.GRP_CD)'), 'dtlCount']],
      where: { academyId },
    });
    const response: IResponse = {
      result: true,
      model: grpCdList,
    }
    return response;
  }

  async insGroupCode(): Promise<IResponse> {
    return null;
  }

  async updGroupCode(): Promise<IResponse> {
    return null;
  }

  async delGroupCode(): Promise<IResponse> {
    return null;
  }

  async selDetailCodeList(): Promise<IResponse> {
    return null;
  }

  async insDetailCode(): Promise<IResponse> {
    return null;
  }

  async updDetailCode(): Promise<IResponse> {
    return null;
  }

  async delDetailCode(): Promise<IResponse> {
    return null;
  }

  async updCodeOrdering(): Promise<IResponse> {
    return null;
  }

  async selAllDetailCodeList(): Promise<IResponse> {
    return null;
  }

  async selGroupCodeInDetailCodeList(): Promise<IResponse> {
    return null;
  }
}

export default new CodeService();