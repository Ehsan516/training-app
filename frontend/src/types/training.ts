export interface Exercise{
    id: string;
    name: string;
    category?: string; //"strength"
    tags: string[]; //muscle groups so it's categorised
    isCustom: boolean; //custom exercise such as those not listed
}

export interface Session{
    id: string;
    date: string;
    notes?: string;
    sets: SetEntry[];
}

export interface SetEntry{
    id: string;
    exerciseId: string //ID of exercise not free text
    weightKg?: number;
    reps?: number;
    rpe?: number;
    notes?: string;
}