from telegraph import Telegraph

def create_telegraph_account(user_full_name):
    telegraph = Telegraph()
    response = telegraph.create_account(short_name=user_full_name[:32], author_name=user_full_name)
    
    page_content = f'<p>Список спортсменов тренера {user_full_name}:</p><ul></ul>'
    page = telegraph.create_page(
        title="Мои Спортсмены",
        html_content=page_content
    )
    
    return {
        'access_token': response['access_token'],
        'author_name': response['author_name'],
        'url': page['url']
    }