
export class Constant {
  public static readonly USER_NORMAL: string = 'USER_001';
  public static readonly USER_DELETE: string = 'USER_002';
  public static readonly CODE_NORMAL: string = 'CODE_001';
  public static readonly CODE_DELETE: string = 'CODE_002';

  public static readonly HEADER_KEY: string = 'authorization';

  public static returnDbErrorResponse(error: any): any {
    console.log("<--Sequelize: [Run SQL Error]-->\n" + error)
    // const response: IResponse = { result: false, message: 'SQL Error', jsonData: error }
    return null;
  }
}

export class RoleConst {
  public static readonly ADMIN: string = 'ADMIN';
  public static readonly ACADEMY: string = 'ACADEMY';
  public static readonly BRANCH: string = 'BRANCH';
  public static readonly TEACHER: string = 'TEACHER';
  public static readonly STUDENT: string = 'STUDENT';
}