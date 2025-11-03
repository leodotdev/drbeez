interface Env {
  SITE_CONTENT: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const content = await context.env.SITE_CONTENT.get('site_content', 'json');

    if (!content) {
      // Return default content if nothing is stored yet
      const defaultContent = await import('../../lib/default-content');
      return new Response(JSON.stringify(defaultContent.defaultContent), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify(content), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch content' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const content = await context.request.json();

    // Store the content in KV
    await context.env.SITE_CONTENT.put('site_content', JSON.stringify(content));

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to save content' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
