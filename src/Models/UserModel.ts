export class UserModel{
    public _id: any;
    public userName: string = '';
    public email: string = '';
    public mobile: string = '';
    public avtar: any;
    public password: string = '';
    public authority: string;
    public status: string;
    public address: string = '';
    public aboutme: string = '';
    public friends: [];
    public notifications: [];
    public requests: [];
    public website: string = '';
    public github: string = '';
    public twitter: string = '';
    public instagram: string = '';
    public facebook: string = '';
    public createdAt: string;
    public updatedAt: string;
}