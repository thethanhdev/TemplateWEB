import Link from 'next/link';
import { useLocale } from '../context/LocaleContext';

export default function Introduction({ photos = null }) {
	const { t } = useLocale();
	// If photos prop is provided, render a compact intro used on the homepage
	const Compact = () => (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
			<div>
			<h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">{t('introduction.heading_prefix')}</h2>
			<h3 className="text-xl sm:text-2xl md:text-3xl font-heading text-amber-100/80 mb-4">{t('introduction.brand')}</h3>
						<p className="text-sm sm:text-base text-amber-100/70 mb-6">{t('introduction.paragraph')}</p>
				<Link href="/about" legacyBehavior>
					  <a className="inline-block border-2 border-amber-300 text-amber-100 px-4 py-2 rounded-md font-semibold shadow-sm hover:bg-amber-400 hover:text-black transition-colors">{t('introduction.compact_cta')}</a>
				</Link>
			</div>

			<div className="grid grid-cols-2 gap-3">
				{(photos || []).slice(0,4).map((p, i) => (
					<div key={i} className="h-36 bg-cover bg-center rounded" style={{ backgroundImage: `url('${p}')` }} />
				))}
			</div>
		</div>
	);

	// Full standalone introduction page layout
	const Full = () => (
		<section className="text-white py-2">
			<div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
				<div>
								<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-hero tracking-wide leading-tight mb-6">{t('introduction.heading_prefix')}</h2>
								<h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-amber-100/80 mb-6">{t('introduction.brand')}</h3>

								<p className="text-sm sm:text-base md:text-lg text-amber-100/70 max-w-xl mb-8">{t('introduction.paragraph')}</p>

					<div>
						<Link href="/gioi-thieu" legacyBehavior>
											<a className="inline-block border-2 border-amber-300 text-amber-100 px-6 py-3 rounded-md font-semibold shadow-sm hover:bg-amber-400 hover:text-black transition-colors">
												{t('introduction.cta')}
											</a>
						</Link>
					</div>
				</div>

				<div className="w-full h-64 md:h-96 bg-cover bg-center rounded-md shadow-inner" style={{ backgroundImage: "url('/images/intro.jpg')" }} />
			</div>
		</section>
	);

	return photos ? (
		<section className="py-12">
			<div className="max-w-6xl mx-auto px-4">
				<Compact />
			</div>
		</section>
	) : (
		<Full />
	);
}
