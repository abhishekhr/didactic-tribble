# Run some invalid signup tests later
feature 'Visitor signs up' do
  scenario 'successfully with valid email and password' do
    visit new_person_session_path
    click_on 'Sign up'
    fill_in 'person[name]', with: 'example user'
    fill_in 'person[email]', with: 'example@user.com'
    fill_in 'person[password]', with: 'password'
    fill_in 'person[password_confirmation]', with: 'password'
    click_button 'Sign Up'

    expect(page).to have_content 'Log Out'
    expect(page).not_to have_content 'Sign up'
  end

  scenario 'visitor cannot sign up with invalid email address' do
    sign_up('awesome user', 'bogus', 'please123', 'please123')
    expect(page).to have_content 'is invalid'
  end

  scenario 'visitor cannot sign up without password' do
    sign_up('awesome user', 'test@example.com', '', '')
    expect(page).to have_content "can't be blank"
  end

  scenario 'visitor cannot sign up without name' do
    sign_up('', 'test@example.com', 'pleas', 'pleas')
    expect(page).to have_content "can't be blank"
  end

  scenario 'visitor cannot sign up with a short password' do
    sign_up('awesome user', 'test@example.com', 'pleas', 'pleas')
    expect(page).to have_content 'is too short'
  end

  scenario 'visitor cannot sign up without password confirmation' do
    sign_up('awesome user', 'test@example.com', 'PleaseAccept123!', '')
    expect(page).to have_content "doesn't match"
  end

  scenario 'visitor cannot sign up with mismatched password and confirmation' do
    sign_up('awesome user', 'test@example.com',
            'PleaseAccept123!', 'PleaseDontAccept123!')
    expect(page).to have_content "doesn't match"
  end
end
