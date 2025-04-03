import { Status } from "../utils";

export  type TODOItem ={
 id : number ;
 title : string;
 description :string;
 status : Status;
 targetCompletionDate : Date;
 completetionDate ? : Date;
 lastModifiedDate ?:Date;
 createdDateTime :Date;

}