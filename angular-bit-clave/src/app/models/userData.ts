export class UserData {
     public phone: string;
     public email: string;
     public country: string;
     public city: string;
     public sex: string;
     public age: string;
     public interests: string[];
     public places: string[];
     constructor(phone , email , country , city , sex , age , interests , places) {
        this.phone = phone;
        this.email = email;
        this.country = country;
        this.city = city;
        this.sex = sex;
        this.age = age;
        this.interests = interests;
        this.places = places;
    }
}
