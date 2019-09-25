export class Response {
  private statusCode: number;
  private body: string;
  private headers: any;
  constructor(statusCode:number, body:string, headers:any){
    this.statusCode=statusCode;
    this.body=body;
    this.headers=headers;
  }
  toJSON() {
    return {
      statusCode:this.statusCode,
      body:this.body,
      headers:this.headers
    };
  }
}