import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

async function getServerSideProps({ locale }: { locale: string }) : Promise<any> {
	// try {
	// 	await verifyUserToken(ctx);

	// 	const response = {
	// 		props: {
	// 			...(await serverSideTranslations(ctx.locale, ['library'])),
	// 		},
	// 	};

	// 	return response;
	// } catch (err) {
	// 	const response = {
	// 		redirect: {
	// 			permanent: false,
	// 			destination: '/login',
	// 		},
	// 		props: {},
	// 	};

	// 	return response;
	// }
    return {
        props: {
          ...(await serverSideTranslations(locale, ["common"])),
        },
      };
};


async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

import { useTranslation } from 'next-i18next';


export {
	useTranslation,
	getStaticProps,
	getServerSideProps
}
