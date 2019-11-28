import { IResponse } from '../../models/IResponse';
import { CdGrp, CdDtl } from '../../models/Code';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { Constant } from '../../config/Constant';

class CodeService {
  async selGroupCodeList(academyId: number): Promise<IResponse> {
    const grpCdList = await CdGrp.findAll({
      attributes: ['grpId', 'grpCd', 'grpCdName', 'status', [Sequelize.literal('(SELECT COUNT(dtl_id) FROM CD_DTL WHERE CD_DTL.ACADEMY_ID = CD_GRP.ACADEMY_ID AND CD_DTL.GRP_CD = CD_GRP.GRP_CD)'), 'dtlCount']],
      where: { academyId },
    }).catch(Constant.returnDbErrorResponse);
    const response: IResponse = {
      result: true,
      model: grpCdList,
    };
    return response;
  }

  async insGroupCode(grpCode: CdGrp): Promise<IResponse> {
    const duplicateCount = await CdGrp.count({ where: { grpCd: grpCode.grpCd }}).catch(Constant.returnDbErrorResponse);
    if (duplicateCount === 0) {
      const result = await CdGrp.create(grpCode).catch(Constant.returnDbErrorResponse);
      // .catch(error => {
      //   console.log("insGroupCode -> CdGrp.create : 으아악 에러가 났다.\n" + error)
      //   return { result: false, message: 'DB Error', jsonData: error }
      // });
      console.log('create result==> ', result);
    } else {
      return { result: false, message: 'Duplicate Group Code'};
    }
    return { result: true };
  }

  async updGroupCode(grpCode: CdGrp): Promise<IResponse> {
    const result = await CdGrp.update(grpCode, { where: { grpId: grpCode.grpId }}).catch(Constant.returnDbErrorResponse);
    console.log('update result==> ', result);
    if (grpCode.grpCd) {
      await CdDtl.update({ grpCd: grpCode.grpCd }, { where: { grpId: grpCode.grpId }}).catch(Constant.returnDbErrorResponse);
    }
    return { result: true };
  }

  async delGroupCode(grpId: number): Promise<IResponse> {
    const result = await CdGrp.destroy({ where: { grpId }}).catch(Constant.returnDbErrorResponse);
    console.log('destroy result==> ', result);
    return { result: true };
  }

  async selDetailCodeList(grpId?: number): Promise<IResponse> {
    let whereObj: any = {}
    if (grpId) {
      whereObj.grpId = grpId;
    }
    const dtlCdList = await CdGrp.findAll({
      attributes: ['GRP_CD', 'DTL_CD', 'DTL_CD_NAME', 'VAL1', 'VAL2', 'VAL3', 'DTL_ORDER', 'STATUS'],
      where: whereObj,
    }).catch(Constant.returnDbErrorResponse);
    const response: IResponse = {
      result: true,
      model: dtlCdList,
    };
    return response;
  }

  async insDetailCode(dtlCode: CdDtl): Promise<IResponse> {
    const duplicateCount = await CdDtl.count({ where: { grpId: dtlCode.grpId, dtlCd: dtlCode.dtlCd }}).catch(Constant.returnDbErrorResponse);
    if (duplicateCount === 0) {
      const result = await CdGrp.create(dtlCode).catch(Constant.returnDbErrorResponse);
      console.log('create result==> ', result);
    } else {
      return { result: false, message: 'Duplicate Detail Code'};
    }
    return { result: true };
  }

  async updDetailCode(dtlCode: CdDtl): Promise<IResponse> {
    let duplicateCount: number = 0;
    if (dtlCode.dtlCd) {
      duplicateCount = await CdDtl.count({ where: { grpId: dtlCode.grpId, dtlCd: dtlCode.dtlCd }});
    }
    if (duplicateCount === 0) {
      const result = await CdDtl.update(dtlCode, { where: { dtlId: dtlCode.dtlId }}).catch(Constant.returnDbErrorResponse);
      console.log('update result==> ', result);
    } else {
      return { result: false, message: 'Duplicate Detail Code'};
    }
    return { result: true };
  }

  async delDetailCode(dtlId: number): Promise<IResponse> {
    const result = await CdDtl.destroy({ where: { dtlId }}).catch(Constant.returnDbErrorResponse);
    console.log('destroy result==> ', result);
    return { result: true };
  }

  async updCodeOrdering(cdDtlList: CdDtl[]): Promise<IResponse> {
    for (const cdDtl of cdDtlList) {
      await CdDtl.update({ dtlOrder: cdDtl.dtlOrder }, { where: { dtlId: cdDtl.dtlId }})
    }
    return { result: true };;
  }

  async selGroupCodeInDetailCodeList(academyId: number, searchGrpCdList: string[]): Promise<IResponse> {
    const grpCdList = await CdGrp.findAll({
      attributes: ['grpId', 'grpCd', 'grpCdName', 'status'],
      where: { academyId, grpCd: searchGrpCdList },
      include: [{
        attributes: ['GRP_CD', 'DTL_CD', 'DTL_CD_NAME', 'VAL1', 'VAL2', 'VAL3', 'DTL_ORDER', 'STATUS'],
        model: CdDtl,
        where: { academyId, grpCd: searchGrpCdList },
        required: true
      }]
    }).catch(Constant.returnDbErrorResponse);
    const response: IResponse = {
      result: true,
      model: grpCdList,
    };
    return response;
  }
}

export default new CodeService();