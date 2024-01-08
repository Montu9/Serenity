import { Card } from "@/components/ui/card";

export const TermsOfService = () => {
    return (
        <div className="h-full w-full min-h-screen min-w-screen">
            <Card className="container relative px-8 py-12 lg:my-12">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Website Terms and Conditions of Use
                </h1>

                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    1. Terms
                </h2>

                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    By accessing this Website, accessible from https://serenityms.xyz, you are agreeing to be bound by
                    these Website Terms and Conditions of Use and agree that you are responsible for the agreement with
                    any applicable local laws. If you disagree with any of these terms, you are prohibited from
                    accessing this site. The materials contained in this Website are protected by copyright and trade
                    mark law.
                </p>

                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    2. Use License
                </h2>

                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Permission is granted to temporarily download one copy of the materials on Serenity's Website for
                    personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
                    title, and under this license you may not:
                </p>

                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>modify or copy the materials;</li>
                    <li>use the materials for any commercial purpose or for any public display;</li>
                    <li>attempt to reverse engineer any software contained on Serenity's Website;</li>
                    <li>remove any copyright or other proprietary notations from the materials; or</li>
                    <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
                </ul>

                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    This will let Serenity to terminate upon violations of any of these restrictions. Upon termination,
                    your viewing right will also be terminated and you should destroy any downloaded materials in your
                    possession whether it is printed or electronic format. These Terms of Service has been created with
                    the help of the <a href="https://www.termsofservicegenerator.net">Terms Of Service Generator</a>.
                </p>

                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    3. Disclaimer
                </h2>

                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    All the materials on Serenity's Website are provided "as is". Serenity makes no warranties, may it
                    be expressed or implied, therefore negates all other warranties. Furthermore, Serenity does not make
                    any representations concerning the accuracy or reliability of the use of the materials on its
                    Website or otherwise relating to such materials or any sites linked to this Website.
                </p>

                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    4. Limitations
                </h2>

                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Serenity or its suppliers will not be hold accountable for any damages that will arise with the use
                    or inability to use the materials on Serenity's Website, even if Serenity or an authorize
                    representative of this Website has been notified, orally or written, of the possibility of such
                    damage. Some jurisdiction does not allow limitations on implied warranties or limitations of
                    liability for incidental damages, these limitations may not apply to you.
                </p>

                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    5. Revisions and Errata
                </h2>

                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    The materials appearing on Serenity's Website may include technical, typographical, or photographic
                    errors. Serenity will not promise that any of the materials in this Website are accurate, complete,
                    or current. Serenity may change the materials contained on its Website at any time without notice.
                    Serenity does not make any commitment to update the materials.
                </p>

                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    6. Links
                </h2>

                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Serenity has not reviewed all of the sites linked to its Website and is not responsible for the
                    contents of any such linked site. The presence of any link does not imply endorsement by Serenity of
                    the site. The use of any linked website is at the user's own risk.
                </p>

                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    7. Site Terms of Use Modifications
                </h2>

                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Serenity may revise these Terms of Use for its Website at any time without prior notice. By using
                    this Website, you are agreeing to be bound by the current version of these Terms and Conditions of
                    Use.
                </p>

                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    8. Your Privacy
                </h2>

                <p className="leading-7 [&:not(:first-child)]:mt-6">Please read our Privacy Policy.</p>

                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    9. Governing Law
                </h2>

                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Any claim related to Serenity's Website shall be governed by the laws of pl without regards to its
                    conflict of law provisions.
                </p>
            </Card>
        </div>
    );
};
