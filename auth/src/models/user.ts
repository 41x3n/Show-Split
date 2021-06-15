import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties

interface UserAttrs {
	email: string;
	password: string;
}

// An interface that describes the properties that a user model has

interface UserModel extends mongoose.Model<any> {
	build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has

interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		toJSON: {
			//to JSON is an internal feature of mongoose which let you manipulate what data the schema returns when an user is created
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			}
		}
	}
);

userSchema.pre('save', async function(done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema); // We are sending interfaces using generic to do type check inside the mongoose.model function before it can compile the User model

export { User };
