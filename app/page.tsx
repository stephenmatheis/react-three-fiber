import { Page } from '@/components/page';
import { Main } from '@/components/main';
// import { Memoji } from '@/components/memoji';
import { Cube } from '@/components/cube';

export default function RootPage() {
    return (
        <>
            <Cube />
            <Page
                links={[
                    {
                        label: 'Settings',
                        path: '/settings',
                    },
                ]}
                style={{
                    pointerEvents: 'none',
                }}
            >
                <Main columns={2}>{/* <Memoji /> */}</Main>
            </Page>
        </>
    );
}
