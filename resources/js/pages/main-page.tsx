import AppLayout from '@/components/layouts/app-layout';
import AppWrapper from '@/components/layouts/app-wrapper';
import { Group } from '@/types/models/Group';
import { User } from '@/types/models/User';
import React from 'react';

type MainPageProps = {
    groups: Group[];
    friends: User[];
}

const MainPage: React.FC<MainPageProps> = ({ groups, friends }) => {
    return (
        <AppWrapper>
            <AppLayout className="app-container grid grid-cols-1 gap-2 p-4 md:grid-cols-2">
                <section className="rounded-md bg-background p-4">
                    <p>
                        Yuh: {JSON.stringify(groups)}
                    </p>
                    <p>
                        Yuh: {JSON.stringify(friends)}
                    </p>
                </section>
                <section className="rounded-md bg-background p-4">Sup</section>
                <section className="rounded-md bg-background p-4 md:col-span-2">2</section>
            </AppLayout>
        </AppWrapper>
    );
};

export default MainPage;
