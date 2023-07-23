import { Page } from '@/components/page';
import { Main } from '@/components/main';
// import { Memoji } from '@/components/memoji';
import { Cube } from '@/components/cube';

export default function RootPage() {
    return (
        <Page
            links={[
                {
                    label: 'Settings',
                    path: '/settings',
                },
            ]}
        >
            <Main columns={2} style={{ zIndex: 1, pointerEvents: 'none' }}>
                {/* <Memoji /> */}
            </Main>
            <Cube />
        </Page>
    );
}
