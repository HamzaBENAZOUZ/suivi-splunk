// Synchronisation en ligne (facultative) avec Supabase.
// Colle ici les deux valeurs de ton projet Supabase : Project Settings > API (ou "Connect").
// Ces deux valeurs sont publiques par conception : la sécurité vient des règles RLS (définies dans la base Supabase).
// Laisse les champs vides pour garder un site 100 % local (avancement dans le navigateur seulement).
// N'y mets JAMAIS la clé "service_role" / "secret".
window.SYNC_CONFIG = {
  supabaseUrl: "https://jmmwzrwdavufrzwaigrc.supabase.co",   // ex. ""
  supabaseKey: "sb_publishable_xsxn3KTwZw2IN82lyuJQ_Q_BKHrZdLD"    // clé "anon public" (eyJ...) ou "publishable" (sb_publishable_...)
};
