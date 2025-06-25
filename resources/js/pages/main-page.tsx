import AppLayout from '@/components/layouts/app-layout';
import AppWrapper from '@/components/layouts/app-wrapper';
import ReciteForm from '@/features/main/components/recite-form';
import { Chapter } from '@/types/models/Chapter';
import { Group } from '@/types/models/Group';
import { Juz } from '@/types/models/Juz';
import { User } from '@/types/models/User';
import React from 'react';

type MainPageProps = {
    groups: Group[];
    friends: User[];
    chapters: Chapter[];
    juzs: Juz[];
}

const MainPage: React.FC<MainPageProps> = ({ groups, friends, chapters, juzs }) => {
    return (
        <AppWrapper>
            <AppLayout className="app-container grid grid-cols-1 gap-2 p-4 lg:grid-cols-2">
                <section className="rounded-md bg-background p-4">
                    <ReciteForm groups={groups} friends={friends} chapters={chapters} juzs={juzs} />
                </section>
                <section className="rounded-md bg-background p-4">Maps</section>
                <section className="rounded-md bg-background p-4 sm:col-span-2">Table</section>
            </AppLayout>
        </AppWrapper>
    );
};

export default MainPage;
