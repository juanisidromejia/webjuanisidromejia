import './_astro_content_DbhLpY9b.mjs';

function slugify(input) {
  if (!input) return "";
  var slug = input.toLowerCase().trim();
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  slug = slug.replace(/[^a-z0-9\s-]/g, " ").trim();
  slug = slug.replace(/[\s-]+/g, "-");
  return slug;
}

function sortItemsByDateDesc(itemA, itemB) {
  return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}
function getAllTags(posts) {
  const tags = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];
  return tags.map((tag) => {
    return {
      name: tag,
      id: slugify(tag)
    };
  }).filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
  });
}
function getPostsByTag(posts, tagId) {
  const filteredPosts = posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagId));
  return filteredPosts;
}

export { slugify as a, getPostsByTag as b, getAllTags as g, sortItemsByDateDesc as s };
