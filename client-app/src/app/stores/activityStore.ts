import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from './../models/activity';

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor () {
        makeAutoObservable(this)
    }

    get activitiesByDate () {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    get groupedActivities () {
        return Object.entries(this.activitiesByDate.reduce((activities, activity) => {
            const date = activity.date;
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as {[key: string]: Activity[]}))
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => this.setActivity(activity));
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.setSelectedActivity(activity);
            return activity;
        } else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                this.setLoadingInitial(false);
                this.setSelectedActivity(activity);
                return activity;
            } catch (error) {
                this.setLoadingInitial(false);
            }
        }
    }

    createActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.create(activity);

            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
            })

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
        } catch (error) {
            this.setLoading(false);
        }
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    private setSelectedActivity = (activity: Activity) => {
        this.selectedActivity = activity;
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setEditMode = (state: boolean) => {
        this.editMode = state;
    }


    setLoading = (state: boolean) => {
        this.loading = state;
    }
}