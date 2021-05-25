import { makeAutoObservable, runInAction } from 'mobx';
import { User, UserCreateOrLogin } from './../models/user';
import agent from '../api/agent';
import { store } from './store';
import { history } from '../..';

export default class UserStore {
    user: User | null = null;

    constructor(){
        makeAutoObservable(this)
    }

    get isLoggedIn(): boolean {
        return !!this.user
    }

    login = async (cred: Partial<UserCreateOrLogin>) => {
        try {
            const user = await agent.Account.login(cred);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            });
            history.push('/activities');
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        this.user = null;
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            
        }
    }
}