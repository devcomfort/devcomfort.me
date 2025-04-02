export function slugify(input?: string) {
    if (!input) return '';

    // make lower case and trim
    var slug = input.toLowerCase().trim();

    // handle Korean characters - keep them as is
    if (/[\u3131-\uD79D]/.test(slug)) {
        // For Korean text, simply replace spaces with hyphens and remove invalid chars
        slug = slug.replace(/[^\uAC00-\uD7A3\u3131-\uD79Da-z0-9\s-]/g, '')
                  .trim()
                  .replace(/[\s-]+/g, '-');
        return slug;
    }

    // For non-Korean text, proceed with standard slugify
    // remove accents from charaters
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // replace invalid chars with spaces
    slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim();

    // replace multiple spaces or hyphens with a single hyphen
    slug = slug.replace(/[\s-]+/g, '-');

    return slug;
}
