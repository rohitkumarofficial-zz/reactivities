import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from './../models/activity';
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor () {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id, activity);
            });

            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    createActivity = async (activity: Activity) => {
        this.setLoading(true);
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);

            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
            })

            this.selectActivity(activity.id);
            this.setLoading(false);

        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    updateActivity = async (activity: Activity) => {
        this.setLoading(true);
        this.setEditMode(true);
        try {
            await agent.Activities.update(activity);

            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
            })

            this.selectActivity(activity.id);
            this.setLoading(false);
            this.setEditMode(false);

        } catch (error) {
            console.log(error);
            this.setLoading(false);
            this.setEditMode(false);
        }
    }

    deleteActivity = async (id: string) => {
        this.setLoading(true);
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
            });
            this.setLoading(false);
            this.cancelSelectedActivity();
        } catch (error) {
            this.setLoading(false);
        }
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.setEditMode(false);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        if (id) {
            this.selectActivity(id);
        } else {
            this.selectedActivity = undefined;
        }

        this.setEditMode(true);
    }

    setEditMode = (state: boolean) => {
        this.editMode = state;
    }

    closeForm = () => {
        this.setEditMode(false);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }
}